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
const emojis = ["🎉", "🥳", "✨", "🎊", "💖", "🌟", "🎈", "🍾", "🎁", "💫"]; // List of emojis

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

  const animateConfetti = () => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const aliveParticles = [];

    for (let i = 0; i < particlesRef.current.length; i++) {
      const particle = particlesRef.current[i];

      // Update particle position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
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
      animationIdRef.current = requestAnimationFrame(animateConfetti);
    } else {
      stopConfetti();
    }
  };

  let lastParticle: Particle | null = null;
  let lastParticleAlpha: number | null = null;
  let lastParticleFont: string | null = null;
  let lastParticleColor: string | null = null;

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    // Check if the particle properties have changed
    const alpha = 1 - particle.lifetime / maxLifetime; // Fading effect

    // If the particle is the same as the last drawn, return early
    if (
      lastParticle === particle &&
      lastParticleAlpha === alpha &&
      lastParticleFont === `${particle.size}px Arial` &&
      lastParticleColor === particle.color
    ) {
      ctx.globalAlpha = alpha;
      ctx.fillText(particle.emoji!, -particle.size / 2, particle.size / 2);
      return;
    }

    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);

    ctx.globalAlpha = alpha;

    if (particle.emoji) {
      const font = `${particle.size}px Arial`;
      if (font !== lastParticleFont) {
        ctx.font = font; // Set font only if it's different
        lastParticleFont = font;
      }
      ctx.fillText(particle.emoji, -particle.size / 2, particle.size / 2);
    } else if (particle.shape) {
      ctx.fillStyle = particle.color!;
      if (particle.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(
          -particle.size / 2,
          -particle.size / 2,
          particle.size,
          particle.size
        );
      }
    }

    ctx.restore();

    // Update last particle details
    lastParticle = particle;
    lastParticleAlpha = alpha;
    lastParticleColor = particle.color;
  };

  const initializeParticles = useCallback(() => {
    stopConfetti(); // Stop any existing confetti before starting a new one

    const preset = presets[selectedPreset]; // Access the selected preset

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
  }, [presets, selectedPreset, spawnerIds, createParticle]);

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

    if (preset.particleCount > particlesPoolForSpawner.length) {
      for (let i = 0; i < preset.particleCount; i++) {
        particlesPoolForSpawner.push(CreateEmptyParticle()); // Use a new function to create empty particles
      }
    }

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
