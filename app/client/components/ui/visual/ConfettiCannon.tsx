import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useOnlyOnClient from "../../hooks/useOnlyOnClient";
import ConfettiPresets from "../../data/ConfettiPresets";
import ConfettiCanvas from "../interactive/ConfettiCanvas";

interface ConfettiProps {
  particleCount?: number; // Starting number of particles
  colors?: string[];
  maxLifetime?: number; // Adjusted for longer confetti presence
  gravity?: number; // Adjusted for falling
  wind?: number; // Random wind effect
  spawnerIds: string[];
}

// Emoji List
const emojis = [
  "🎉",
  "🥳",
  "✨",
  "🎊",
  "💖",
  "🌟",
  "🎈",
  "🍾",
  "🎁",
  "💫",
  "🎉",
  "🥳",
  "✨",
  "🎊",
  "💖",
  "🌟",
  "🎈",
  "🍾",
  "🎁",
  "💫",
  "🎉",
  "🥳",
  "✨",
  "🎊",
  "💖",
  "🌟",
  "🎈",
  "🍾",
  "🎁",
  "💫",
  "🎉",
  "🥳",
  "✨",
  "🎊",
  "💖",
  "🌟",
  "🎈",
  "🍾",
  "🎁",
  "💫",
  "astro",
  "bligg",
  "tilt",
  "d",
]; // List of emojis

export type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  accelerationX: number;
  accelerationY: number;
  color: string | null;
  rotation: number;
  rotationSpeed: number;
  shape: "circle" | "rectangle" | null;
  emoji: string | null;
  lifetime: number; // Lifetime of the particle
};

// Create an empty particle with default values for confetti particle effect
const CreateEmptyParticle = (): Particle => {
  return {
    x: 0,
    y: 0,
    size: 10,
    speedX: 0,
    speedY: 0,
    accelerationX: 0,
    accelerationY: 0,
    color: null,
    rotation: 0,
    rotationSpeed: 0,
    shape: null,
    emoji: null,
    lifetime: 0,
  };
};

const Confetti: React.FC<ConfettiProps> = ({
  maxLifetime = 3000, // Longer lifetime for fading out
  spawnerIds,
}) => {
  const [showConfetti, setShowConfetti] = useState(true); // State to toggle regular confetti
  const [selectedPreset, setSelectedPreset] = useState<string>("classic"); // Default preset
  const [showEmojis, setShowEmojis] = useState(true); // State to toggle emojis

  const presets = useMemo(() => ConfettiPresets(), []); // List of confetti presets
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  // Particle Pool
  const particlesPoolForSpawner = useRef<Particle[]>([]).current;
  // const particlesPoolForFalling = useRef<Particle[]>([]).current;

  const isClient = useOnlyOnClient(); // Ensure code runs only on the client side

  const createParticle = useCallback(
    (burstX: number, burstY: number): Particle => {
      // Check if there are any available particles in the pool
      const particle = particlesPoolForSpawner.pop() || CreateEmptyParticle(); // Get from pool or create a new one

      // If the particle already has x and y set, return it without modification
      if (particle.x !== 0 && particle.y !== 0) {
        return particle;
      }

      const preset = presets[selectedPreset]; // Access the selected preset
      const isEmoji = showEmojis && Math.random() < preset.emojiChance; // Check for emoji inclusion

      // Randomly spread left or right for confetti and emojis
      const spreadFactorX = Math.random() < 0.5 ? -1 : 1; // Randomly assign left/right spread

      const speedX =
        (Math.random() * (preset.speedX.max - preset.speedX.min) +
          preset.speedX.min) *
          spreadFactorX +
        preset.wind;

      // Adjust upward speed for confetti, making it similar to emoji behavior
      const speedY = isEmoji
        ? Math.random() * -15 - 10 // For emojis, a larger upward speed
        : Math.random() * -15 - 10; // For confetti, mimic the upward speed of emojis

      // Set particle properties
      particle.x = burstX; // Set burst position
      particle.y = burstY; // Set burst position
      particle.size = isEmoji
        ? Math.random() * 20 + 20 // Size adjustment for emojis
        : Math.random() * (preset.size.max - preset.size.min) + preset.size.min; // Size for confetti
      particle.speedX = speedX;
      particle.speedY = speedY;
      particle.accelerationX = (Math.random() - 0.5) * 0.2; // Slight horizontal acceleration
      particle.accelerationY = preset.gravity; // Use preset gravity
      particle.color =
        isEmoji || !showConfetti
          ? null
          : preset.colors[Math.floor(Math.random() * preset.colors.length)]; // Use random color for confetti
      particle.rotation = Math.random() * 360; // Random rotation
      particle.rotationSpeed =
        Math.random() * (preset.rotationSpeed.max - preset.rotationSpeed.min) +
        preset.rotationSpeed.min; // Rotation speed from preset
      particle.shape =
        isEmoji || !showConfetti
          ? null
          : Math.random() > 0.5
          ? "circle"
          : "rectangle"; // Randomly assign shape
      particle.emoji = isEmoji
        ? emojis[Math.floor(Math.random() * emojis.length)]
        : null; // Select random emoji if applicable
      particle.lifetime = 0; // Initialize lifetime

      // Add the configured particle back to the pool
      particlesPoolForSpawner.push(particle);

      return particle; // Return the configured particle
    },
    [particlesPoolForSpawner, presets, selectedPreset, showEmojis, showConfetti]
  );
  const animateConfetti = (
    angle = 0,
    reverseX = false,
    reverseY = false,
    speedMagnitude = 5
  ) => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const aliveParticles = [];

    // Convert angle to radians
    const radians = (angle * Math.PI) / 180;

    // Calculate offsets based on angle
    const speedOffsetX = Math.cos(radians) * speedMagnitude;
    const speedOffsetY = Math.sin(radians) * speedMagnitude;

    for (let i = 0; i < particlesRef.current.length; i++) {
      const particle = particlesRef.current[i];

      const finalXSpeed =
        angle === 0 || angle === 180
          ? particle.speedX
          : particle.speedX + speedOffsetX;
      const finalYSpeed =
        angle === 90 || angle === 270
          ? particle.speedY
          : particle.speedY + speedOffsetY;

      // Update particle position with angle-based offsets
      particle.y += reverseY ? -finalYSpeed : finalYSpeed;
      particle.x += reverseX ? -finalXSpeed : finalXSpeed;

      particle.speedY += particle.accelerationY;
      particle.lifetime++;

      // Draw only particles still within lifetime
      if (particle.lifetime < maxLifetime) {
        drawParticle(ctx, particle);
        aliveParticles.push(particle); // Keep alive particles
      }
    }

    // Update particle array to only keep alive particles
    particlesRef.current = aliveParticles;

    // Continue animation if there are particles left
    if (particlesRef.current.length > 0) {
      animationIdRef.current = requestAnimationFrame(() =>
        animateConfetti(angle, reverseX, reverseY)
      ); // Pass angle and direction to the next frame
    } else {
      stopConfetti();
    }
  };

  // Function to round size to nearest increment (e.g., 10)
  const roundToNearestSize = (size: number, increment: number) => {
    return Math.round(size / increment) * increment;
  };

  // Cache object for emojis and shapes
  const emojiCache: { [key: string]: HTMLCanvasElement } = {};
  const shapeCache: { [key: string]: HTMLCanvasElement } = {};

  // Function to get the cached emoji or create it if not cached
  const getCachedEmoji = (
    emoji: string,
    size: number,
    increment: number = 10
  ) => {
    const roundedSize = roundToNearestSize(size, increment);
    const cacheKey = `${emoji}-${roundedSize}`;

    // Return the cached canvas if it exists
    if (emojiCache[cacheKey]) {
      return emojiCache[cacheKey];
    }

    // Create a new off-screen canvas for the emoji
    const offscreenCanvas = document.createElement("canvas");
    const ctx = offscreenCanvas.getContext("2d");

    if (!ctx) return null;

    // Set canvas dimensions based on the rounded emoji size
    offscreenCanvas.width = roundedSize;
    offscreenCanvas.height = roundedSize;

    // Draw the emoji on the off-screen canvas
    ctx.font = `${roundedSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, roundedSize / 2, roundedSize / 2); // Center the emoji on the canvas

    // Cache the canvas
    emojiCache[cacheKey] = offscreenCanvas;

    return offscreenCanvas;
  };

  // Function to get the cached shape or create it if not cached
  const getCachedShape = (
    shape: string,
    size: number,
    color: string,
    increment: number = 10
  ) => {
    const roundedSize = roundToNearestSize(size, increment);
    const cacheKey = `${shape}-${roundedSize}-${color}`;

    // Return the cached canvas if it exists
    if (shapeCache[cacheKey]) {
      return shapeCache[cacheKey];
    }

    // Create a new off-screen canvas for the shape
    const offscreenCanvas = document.createElement("canvas");
    const ctx = offscreenCanvas.getContext("2d");

    if (!ctx) return null;

    // Set canvas dimensions based on the rounded shape size
    offscreenCanvas.width = roundedSize;
    offscreenCanvas.height = roundedSize;

    // Draw the shape on the off-screen canvas
    ctx.fillStyle = color;
    ctx.translate(roundedSize / 2, roundedSize / 2); // Center the shape
    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, roundedSize / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(
        -roundedSize / 2,
        -roundedSize / 2,
        roundedSize,
        roundedSize
      );
    }

    // Cache the canvas
    shapeCache[cacheKey] = offscreenCanvas;

    return offscreenCanvas;
  };

  // Updated drawParticle function to use the cached emoji or shape
  const drawParticle = (
    ctx: CanvasRenderingContext2D,
    particle: Particle,
    increment: number = 10,
    rotateOnZ: boolean = true // New parameter to toggle Z rotation and 3D skew effect
  ) => {
    const {
      x,
      y,
      size,
      rotation,
      rotationSpeed,
      emoji,
      shape,
      color,
      lifetime,
    } = particle;

    const alpha = 1 - lifetime / maxLifetime; // Fading effect

    // Round size to nearest increment
    const roundedSize = roundToNearestSize(size, increment);

    ctx.save();

    // Translate to the particle's position
    ctx.translate(x, y);

    // Precalculate angle and scale once
    const angle = (rotation * Math.PI) / 180; // Convert to radians
    const scale = rotateOnZ ? Math.cos(angle) : 1; // Apply scaling for 3D effect when rotateOnZ is true

    if (rotateOnZ) {
      // 3D-like rotation with skew effect
      particle.rotation += rotationSpeed; // Increment rotation based on speed
      ctx.rotate(angle); // Rotate around the Z-axis

      // Apply skew transform for the 3D effect
      const skewFactor = Math.sin(angle) * 0.5;
      ctx.transform(1, skewFactor, skewFactor, 1, 0, 0);
    } else {
      // Standard 2D rotation without skew
      ctx.rotate(angle); // Simple rotation around Z-axis
    }

    ctx.globalAlpha = alpha; // Apply transparency based on lifetime

    // Drawing logic for emoji or shape
    if (emoji) {
      const emojiCanvas = getCachedEmoji(emoji, size, increment);
      if (emojiCanvas) {
        // Use ctx.scale() for scaling instead of resizing manually
        ctx.scale(scale, 1); // Apply scaling for 3D effect
        ctx.drawImage(
          emojiCanvas,
          -roundedSize / 2,
          -roundedSize / 2,
          roundedSize,
          roundedSize
        );
      }
    } else if (shape) {
      const shapeCanvas = getCachedShape(shape, size, color!, increment);
      if (shapeCanvas) {
        // Use ctx.scale() for scaling instead of resizing manually
        ctx.scale(scale, 1); // Apply scaling for 3D effect
        ctx.drawImage(
          shapeCanvas,
          -roundedSize / 2,
          -roundedSize / 2,
          roundedSize,
          roundedSize
        );
      }
    }

    ctx.restore();
  };

  const initializeParticles = useCallback(() => {
    stopConfetti(); // Stop any existing confetti before starting a new one

    const preset = presets[selectedPreset]; // Access the selected preset
    const totalParticles = preset.particleCount * spawnerIds.length;

    // Ensure the pool is filled to the max expected number of particles
    while (particlesPoolForSpawner.length < totalParticles) {
      particlesPoolForSpawner.push(CreateEmptyParticle());
    }

    // Preallocate the particle array with double the size of particleCount for both elements
    const newParticles = new Array(
      preset.particleCount * (spawnerIds.length || 1)
    );
    let particleIndex = 0; // To keep track of the current index in the particles array

    // Loop through each target element to calculate burst positions
    spawnerIds.forEach((id) => {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        const { left, top, width, height } =
          targetElement.getBoundingClientRect();
        // Calculate the center of the target element, adjusting for scrolling
        const burstX = left + width / 2 + window.scrollX;
        const burstY = top + height / 2 + window.scrollY; // Center vertically

        // Create particles for the current target element
        for (let i = 0; i < preset.particleCount; i++) {
          newParticles[particleIndex] = createParticle(
            burstX || Math.random() * width,
            burstY || 0
          );
          particleIndex++; // Move to the next index
        }
      }
    });

    particlesRef.current = newParticles; // Store the new particles in the reference
  }, [
    presets,
    selectedPreset,
    spawnerIds,
    particlesPoolForSpawner,
    createParticle,
  ]);

  const startCannonAtFindMe = () => {
    if (!isClient) return;

    initializeParticles();

    // Start the animation
    animateConfetti();

    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = window.setTimeout(stopConfetti, 10000);
  };

  const stopConfetti = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }

    particlesRef.current.length = 0; // More efficient than reassigning to a new array

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Use canvas properties safely
      }
    }
  };

  useEffect(() => {
    // Pre-fill the pool with empty particles
    const preset = presets[selectedPreset];

    // Initialize the particles every time the preset changes after the pool is pre-filled with empty particles && target Id's exist
    spawnerIds &&
      spawnerIds.length > 0 &&
      particlesPoolForSpawner.length >= preset.particleCount &&
      initializeParticles();
  }, [
    initializeParticles,
    particlesPoolForSpawner,
    presets,
    selectedPreset,
    spawnerIds,
    showEmojis,
  ]);

  return (
    <>
      <ConfettiCanvas
        startCannonAtFindMe={startCannonAtFindMe}
        presets={presets}
        canvasRef={canvasRef}
        showConfetti={showConfetti}
        setShowConfetti={setShowConfetti}
        showEmojis={showEmojis}
        setShowEmojis={setShowEmojis}
        selectedPreset={selectedPreset}
        setSelectedPreset={setSelectedPreset}
      />
    </>
  );
};

export default Confetti;
