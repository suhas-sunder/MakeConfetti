import React, { useEffect, useMemo, useRef, useState } from "react";
import useOnlyOnClient from "../../hooks/useOnlyOnClient";
import ConfettiPresets from "../../data/ConfettiPresets";

interface ConfettiProps {
  particleCount?: number; // Starting number of particles
  colors?: string[];
  maxLifetime?: number; // Adjusted for longer confetti presence
  gravity?: number; // Adjusted for falling
  wind?: number; // Random wind effect
  spawnerIds: string[];
}

// Particle Interface
interface Particle {
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
}

// Emoji List
const emojis = ["🎉", "🥳", "✨", "🎊", "💖", "🌟", "🎈", "🍾", "🎁", "💫"]; // List of emojis

const Confetti: React.FC<ConfettiProps> = ({
  maxLifetime = 3000, // Longer lifetime for fading out
  spawnerIds,
}) => {
  const presets = useMemo(() => ConfettiPresets(), []); // List of confetti presets
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  // Create an empty particle with default values
  const createEmptyParticle = (): Particle => {
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
      lifetime: 0, // Initial lifetime of the particle
    };
  };

  // Particle Pool
  const particlesPool = useRef<Particle[]>([]).current;

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState(true); // State to toggle regular confetti
  const [showEmojis, setShowEmojis] = useState(true); // State to toggle emojis
  const [selectedPreset, setSelectedPreset] = useState<string>("classic"); // Default preset

  const isClient = useOnlyOnClient(); // Ensure code runs only on the client side

  useEffect(() => {
    if (!isClient) return;

    // Setup canvas dimensions
    setCanvasDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [isClient]);

  const createParticle = (burstX: number, burstY: number): Particle => {
    // Check if there are any available particles in the pool
    const particle = particlesPool.pop() || createEmptyParticle(); // Get from pool or create a new one

    console.log(particle.x, particle.y);

    // If the particle already has x and y set, return it without modification
    if (particle.x !== 0 && particle.y !== 0) {
      console.log("Particle already initialized");
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

    return particle; // Return the configured particle
  };

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

  // Memoization storage
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

  const startCannonAtFindMe = () => {
    if (!isClient) return;
    stopConfetti(); // Stop any existing confetti before starting a new one

    const preset = presets[selectedPreset]; // Access the selected preset

    // Locate both target elements and cache their dimensions
    const targetElements = spawnerIds
      .map((id) => document.getElementById(id))
      .filter((element) => element !== null); // Filter out null elements and exit if no target elements found

    // Preallocate the particle array with double the size of particleCount for both elements
    const newParticles = new Array(
      preset.particleCount * targetElements.length
    );
    let particleIndex = 0; // To keep track of the current index in the particles array

    // Loop through each target element to calculate burst positions
    targetElements.forEach((targetElement) => {
      const { left, top, width, height } =
        targetElement.getBoundingClientRect();
      // Calculate the center of the target element, adjusting for scrolling
      const burstX = left + width / 2 + window.scrollX;
      const burstY = top + height / 2 + window.scrollY; // Center vertically

      // Create particles for the current target element
      for (let i = 0; i < preset.particleCount; i++) {
        newParticles[particleIndex] = createParticle(burstX, burstY);
        particleIndex++; // Move to the next index
      }
    });

    particlesRef.current = newParticles;
    animateConfetti();

    // Ensure only one timeout is active, clearing any existing one
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = window.setTimeout(stopConfetti, 10000);
  };

  const startFallingConfetti = () => {
    if (!isClient) return;
    stopConfetti(); // Stop any existing confetti before starting a new one
    const preset = presets[selectedPreset]; // Access the selected preset

    const { width } = canvasDimensions;

    // Preallocate the particle array and generate particles starting from the top
    const newParticles = new Array(preset.particleCount);
    for (let i = 0; i < preset.particleCount; i++) {
      newParticles[i] = createParticle(Math.random() * width, 0);
    }

    particlesRef.current = newParticles;
    animateConfetti();

    // Ensure only one timeout is active by clearing any existing one before setting a new timeout
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = window.setTimeout(stopConfetti, 10000);
  };
  const stopConfetti = () => {
    console.log("Stopping confetti..."); // Check if this logs when expected
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

  const debounce = (func: () => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };
  };

  // Pre-fill the pool with empty particles
  useEffect(() => {
    const preset = presets[selectedPreset];
    for (let i = 0; i < preset.particleCount; i++) {
      particlesPool.push(createEmptyParticle()); // Use a new function to create empty particles
    }
  }, [particlesPool, presets, selectedPreset]);

  // Handle window resizing
  useEffect(() => {
    if (!isClient) return;

    const handleResize = debounce(() => {
      setCanvasDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100); // Adjust the debounce delay as needed

    // Call once on mount to set the initial size
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]); // Only runs when isClient changes

  // Update canvas size whenever dimensions change
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = canvasDimensions.width;
      canvasRef.current.height = canvasDimensions.height;
    }
  }, [canvasDimensions]);

  return (
    <>
      <div className="absolute bottom-0 flex-col z-20 gap-5 flex w-full justify-center items-center">
        <button
          onClick={startFallingConfetti}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Start Falling Confetti
        </button>
        <button
          onClick={startCannonAtFindMe}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Start Cannon at 🎉 Move Me!
        </button>
        <div className="mt-4 flex flex-col">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showConfetti}
              onChange={() => setShowConfetti(!showConfetti)}
            />
            <span className="ml-2">Show Regular Confetti</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showEmojis}
              onChange={() => setShowEmojis(!showEmojis)}
            />
            <span className="ml-2">Show Emojis</span>
          </label>
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="preset" className="mb-2">
            Select Preset:
          </label>
          <select
            id="preset"
            value={selectedPreset}
            onChange={(e) => setSelectedPreset(e.target.value)}
            className="mt-1 p-2 border rounded"
          >
            {Object.keys(presets).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isClient && (
        <canvas
          ref={canvasRef}
          width={canvasDimensions.width * 2}
          height={canvasDimensions.height * 2}
          className="absolute top-[3.2em] min-h-[100vh] left-0 right-0 bottom-0 w-full h-full overflow-x-hidden flex flex-col justify-center items-center "
          style={{ pointerEvents: "none" }} // Allows interaction for buttons etc. below canvas. Remove this or set it to "auto" to disable pointer events below canvas.
        />
      )}
    </>
  );
};

export default Confetti;
