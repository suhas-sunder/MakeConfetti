function ConfettiPresets() {
  const presets: Record<
    string,
    {
      particleCount: number;
      gravity: number;
      wind: number;
      colors: string[];
      size: { min: number; max: number };
      speedX: { min: number; max: number };
      speedY: { min: number; max: number };
      rotationSpeed: { min: number; max: number };
      emojiChance: number;
    }
  > = {
    classic: {
      particleCount: 250,
      gravity: 0.3,
      wind: 0.1,
      colors: ["#FF6347", "#FFD700", "#ADFF2F", "#00BFFF", "#FF69B4"],
      size: { min: 5, max: 15 },
      speedX: { min: -2, max: 2 },
      speedY: { min: -8, max: -15 },
      rotationSpeed: { min: -5, max: 5 },
      emojiChance: 0.1,
    },
    slowFall: {
      particleCount: 150,
      gravity: 0.1,
      wind: 0,
      colors: ["#FF4500", "#FF8C00", "#FFD700", "#ADFF2F"],
      size: { min: 10, max: 20 },
      speedX: { min: -1, max: 1 },
      speedY: { min: -4, max: -10 },
      rotationSpeed: { min: -3, max: 3 },
      emojiChance: 0.15,
    },
    burst: {
      particleCount: 350,
      gravity: 0.4,
      wind: 0.2,
      colors: ["#FF69B4", "#7B68EE", "#32CD32", "#00BFFF", "#FF4500"],
      size: { min: 5, max: 20 },
      speedX: { min: -3, max: 3 },
      speedY: { min: -10, max: -20 },
      rotationSpeed: { min: -10, max: 10 },
      emojiChance: 0.2,
    },
    gentleFloat: {
      particleCount: 200,
      gravity: 0.05,
      wind: 0.1,
      colors: ["#FFB6C1", "#ADD8E6", "#FFEFD5", "#D3FFCE"],
      size: { min: 10, max: 30 },
      speedX: { min: -1, max: 1 },
      speedY: { min: -1, max: -4 },
      rotationSpeed: { min: -1, max: 1 },
      emojiChance: 0.1,
    },
    colorfulCascade: {
      particleCount: 300,
      gravity: 0.25,
      wind: 0.2,
      colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33A8"],
      size: { min: 5, max: 20 },
      speedX: { min: -2, max: 2 },
      speedY: { min: -6, max: -12 },
      rotationSpeed: { min: -3, max: 3 },
      emojiChance: 0.1,
    },
    fireworks: {
      particleCount: 450,
      gravity: 0.5,
      wind: 0.3,
      colors: ["#FF0D00", "#FFD700", "#00FF00", "#00DFFF", "#FF00FF"],
      size: { min: 10, max: 20 },
      speedX: { min: -3, max: 3 },
      speedY: { min: -15, max: -25 },
      rotationSpeed: { min: -10, max: 10 },
      emojiChance: 0.05,
    },
    confettiRain: {
      particleCount: 600,
      gravity: 0.8,
      wind: 0.1,
      colors: ["#FFC107", "#3F51B5", "#8BC34A", "#FF5722"],
      size: { min: 5, max: 15 },
      speedX: { min: -1, max: 1 },
      speedY: { min: 5, max: 10 },
      rotationSpeed: { min: -3, max: 3 },
      emojiChance: 0.15,
    },
    glitterSprinkle: {
      particleCount: 300,
      gravity: 0.2,
      wind: 0.5,
      colors: ["#FFD700", "#FF69B4", "#00BFFF"],
      size: { min: 5, max: 12 },
      speedX: { min: -0.5, max: 0.5 },
      speedY: { min: -2, max: -5 },
      rotationSpeed: { min: -5, max: 5 },
      emojiChance: 0.3,
    },
    autumnLeaves: {
      particleCount: 250,
      gravity: 0.4,
      wind: 0.5,
      colors: ["#FF4500", "#D2691E", "#FFD700", "#ADFF2F"],
      size: { min: 8, max: 20 },
      speedX: { min: -1, max: 1 },
      speedY: { min: -3, max: -8 },
      rotationSpeed: { min: -3, max: 3 },
      emojiChance: 0.1,
    },
    galaxyBlast: {
      particleCount: 350,
      gravity: 0.3,
      wind: 0,
      colors: ["#800080", "#00FFFF", "#FF1493", "#FFD700", "#FFFFFF"],
      size: { min: 5, max: 15 },
      speedX: { min: -3, max: 3 },
      speedY: { min: -10, max: -15 },
      rotationSpeed: { min: -8, max: 8 },
      emojiChance: 0.05,
    },
    galaxyBlast2: {
      particleCount: 350,
      gravity: 0.3,
      wind: 0,
      colors: ["#800080", "#00FFFF", "#FF1493", "#FFD700", "#FFFFFF"],
      size: { min: 5, max: 15 },
      speedX: { min: -3, max: 3 },
      speedY: { min: -10, max: -15 },
      rotationSpeed: { min: -8, max: 8 },
      emojiChance: 0.05,
    },
    rapidFire: {
      particleCount: 400,
      gravity: 0.5,
      wind: 2,
      colors: ["#FF4500", "#FFA500", "#FFD700", "#ADFF2F", "#00FF7F"],
      size: { min: 3, max: 10 },
      speedX: { min: -5, max: 5 },
      speedY: { min: -15, max: -20 },
      rotationSpeed: { min: -5, max: 5 },
      emojiChance: 0.1,
    },
    softDrift: {
      particleCount: 200,
      gravity: 0.1,
      wind: 0.5,
      colors: ["#FFB6C1", "#FF69B4", "#FFC0CB", "#FFFFFF"],
      size: { min: 8, max: 20 },
      speedX: { min: -2, max: 2 },
      speedY: { min: -5, max: -10 },
      rotationSpeed: { min: -3, max: 3 },
      emojiChance: 0.2,
    },
    explosiveBurst: {
      particleCount: 300,
      gravity: 0.4,
      wind: 1,
      colors: ["#FF4500", "#FFD700", "#00FF00", "#1E90FF"],
      size: { min: 5, max: 12 },
      speedX: { min: -8, max: 8 },
      speedY: { min: -10, max: -5 },
      rotationSpeed: { min: -6, max: 6 },
      emojiChance: 0.15,
    },
    spiralingWhirl: {
      particleCount: 250,
      gravity: 0.25,
      wind: 0,
      colors: ["#6A5ACD", "#FF6347", "#FFD700", "#00BFFF"],
      size: { min: 6, max: 18 },
      speedX: { min: -4, max: 4 },
      speedY: { min: -15, max: -5 },
      rotationSpeed: { min: -10, max: 10 },
      emojiChance: 0.1,
    },
    heavyRain: {
      particleCount: 450,
      gravity: 0.6,
      wind: 0,
      colors: ["#00FFFF", "#4682B4", "#ADFF2F", "#FFFFFF"],
      size: { min: 2, max: 5 },
      speedX: { min: -1, max: 1 },
      speedY: { min: -10, max: -15 },
      rotationSpeed: { min: -2, max: 2 },
      emojiChance: 0.02,
    },
    cosmicShimmer: {
      particleCount: 300,
      gravity: 0.4,
      wind: 0.5,
      colors: ["#FF69B4", "#8A2BE2", "#00FA9A", "#FFD700", "#FF4500"],
      size: { min: 5, max: 12 },
      speedX: { min: -4, max: 4 },
      speedY: { min: -10, max: -15 },
      rotationSpeed: { min: -7, max: 7 },
      emojiChance: 0.1,
    },
    vibrantEruption: {
      particleCount: 350,
      gravity: 0.6,
      wind: 0,
      colors: ["#FF0000", "#FF8C00", "#FFD700", "#32CD32", "#1E90FF"],
      size: { min: 4, max: 10 },
      speedX: { min: -6, max: 6 },
      speedY: { min: -12, max: -18 },
      rotationSpeed: { min: -4, max: 4 },
      emojiChance: 0.15,
    },
    sunsetGlow: {
      particleCount: 250,
      gravity: 0.2,
      wind: 1,
      colors: ["#FF4500", "#FF6347", "#FF7F50", "#FFD700", "#FFE4B5"],
      size: { min: 6, max: 14 },
      speedX: { min: -3, max: 3 },
      speedY: { min: -7, max: -12 },
      rotationSpeed: { min: -3, max: 3 },
      emojiChance: 0.2,
    },
    frostyWhirlwind: {
      particleCount: 400,
      gravity: 0.3,
      wind: 0,
      colors: ["#00BFFF", "#87CEFA", "#FFFFFF", "#B0E0E6", "#4682B4"],
      size: { min: 5, max: 10 },
      speedX: { min: -2, max: 2 },
      speedY: { min: -8, max: -14 },
      rotationSpeed: { min: -5, max: 5 },
      emojiChance: 0.05,
    },
    rainbowCascade: {
      particleCount: 300,
      gravity: 0.5,
      wind: 0.5,
      colors: [
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#00FFFF",
        "#0000FF",
        "#4B0082",
      ],
      size: { min: 4, max: 12 },
      speedX: { min: -3, max: 3 },
      speedY: { min: -10, max: -15 },
      rotationSpeed: { min: -6, max: 6 },
      emojiChance: 0.1,
    },
    mysticalOrb: {
      particleCount: 200,
      gravity: 0.1,
      wind: 1.5,
      colors: ["#7B68EE", "#FF00FF", "#8B008B", "#FFA07A", "#FFD700"],
      size: { min: 5, max: 15 },
      speedX: { min: -4, max: 4 },
      speedY: { min: -5, max: -10 },
      rotationSpeed: { min: -8, max: 8 },
      emojiChance: 0.1,
    },
    supernovaBlast: {
      particleCount: 1000,
      gravity: 0.8,
      wind: 2,
      colors: ["#FF0000", "#FFFF00", "#FF4500", "#FF1493", "#00FF00"],
      size: { min: 10, max: 30 },
      speedX: { min: -10, max: 10 },
      speedY: { min: -20, max: -40 },
      rotationSpeed: { min: -15, max: 15 },
      emojiChance: 0.2,
    },
    chaoticVortex: {
      particleCount: 800,
      gravity: 0.5,
      wind: 3,
      colors: ["#8A2BE2", "#7FFF00", "#FF6347", "#FFD700", "#FF69B4"],
      size: { min: 5, max: 25 },
      speedX: { min: -15, max: 15 },
      speedY: { min: -30, max: -50 },
      rotationSpeed: { min: -20, max: 20 },
      emojiChance: 0.3,
    },
    plasmaStorm: {
      particleCount: 1200,
      gravity: 0.7,
      wind: 4,
      colors: ["#FF00FF", "#00FFFF", "#FF4500", "#FFD700", "#00FF00"],
      size: { min: 5, max: 20 },
      speedX: { min: -12, max: 12 },
      speedY: { min: -25, max: -35 },
      rotationSpeed: { min: -18, max: 18 },
      emojiChance: 0.25,
    },
    electricFury: {
      particleCount: 900,
      gravity: 0.6,
      wind: 1.5,
      colors: ["#00BFFF", "#FFD700", "#FF4500", "#8B008B", "#FFFF00"],
      size: { min: 8, max: 22 },
      speedX: { min: -20, max: 20 },
      speedY: { min: -15, max: -30 },
      rotationSpeed: { min: -25, max: 25 },
      emojiChance: 0.15,
    },
    fieryInferno: {
      particleCount: 1500,
      gravity: 0.9,
      wind: 1,
      colors: ["#FF4500", "#FF6347", "#FFD700", "#FF1493", "#FFFFFF"],
      size: { min: 8, max: 18 },
      speedX: { min: -25, max: 25 },
      speedY: { min: -35, max: -50 },
      rotationSpeed: { min: -30, max: 30 },
      emojiChance: 0.4,
    },
    cosmicCascade: {
      particleCount: 600,
      gravity: 0.4,
      wind: 2.5,
      colors: ["#00FA9A", "#8A2BE2", "#00FFFF", "#FF69B4", "#FFD700"],
      size: { min: 4, max: 16 },
      speedX: { min: -30, max: 30 },
      speedY: { min: -40, max: -60 },
      rotationSpeed: { min: -15, max: 15 },
      emojiChance: 0.3,
    },
    radialBurst: {
      particleCount: 400,
      gravity: 0.3,
      wind: 0, // No wind for pure radial motion
      colors: ["#FF5733", "#FFC300", "#DAF7A6", "#581845"],
      size: { min: 5, max: 20 },
      speedX: { min: -10, max: 10 }, // Control spread in the X direction
      speedY: { min: -15, max: -30 }, // Control upward speed
      rotationSpeed: { min: -5, max: 5 },
      emojiChance: 0.2,
    },
    spiralEffect: {
      particleCount: 500,
      gravity: 0.2,
      wind: 0, // No wind to focus on spiral motion
      colors: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"],
      size: { min: 4, max: 12 },
      speedX: { min: -20, max: 20 }, // Broad X range for spiraling
      speedY: { min: -25, max: -40 }, // Upward speed for spiraling effect
      rotationSpeed: { min: -10, max: 10 },
      emojiChance: 0.3,
    },
    fanShape: {
      particleCount: 500,
      gravity: 0.5,
      wind: 1, // Light wind to help particles disperse
      colors: ["#FF5733", "#33FF57", "#5733FF", "#FF33A1"],
      size: { min: 6, max: 18 },
      speedX: { min: -5, max: 5 }, // Narrow X range for focused spread
      speedY: { min: -20, max: -40 }, // Strong upward motion
      rotationSpeed: { min: -15, max: 15 },
      emojiChance: 0.3,
    },
    SlowMoFlow: {
      particleCount: 600,
      gravity: 0.1,
      wind: 1.5, // Gentle wind for lateral movement
      colors: ["#FF69B4", "#00FA9A", "#FFD700", "#8A2BE2"],
      size: { min: 3, max: 15 },
      speedX: { min: -10, max: 10 }, // Control lateral motion
      speedY: { min: -10, max: -30 }, // Upward motion with gentle gravity
      rotationSpeed: { min: -5, max: 5 },
      emojiChance: 0.25,
    },
    extremeRadialBurst: {
      particleCount: 800, // Increased particle count for a fuller burst
      gravity: 0.5, // Increased gravity for faster descent
      wind: 5, // Added wind for lateral motion
      colors: ["#FF5733", "#FFC300", "#DAF7A6", "#581845", "#FF00FF"], // More vibrant colors
      size: { min: 10, max: 30 }, // Larger size for more visibility
      speedX: { min: -30, max: 30 }, // Broader spread in X direction
      speedY: { min: -30, max: -60 }, // Stronger upward speed for dramatic bursts
      rotationSpeed: { min: -20, max: 20 }, // Greater rotation speed for dynamic movement
      emojiChance: 0.4, // Higher chance of emojis
    },
    extremeSpiralEffect: {
      particleCount: 1000, // Even more particles for a grand display
      gravity: 0.4, // Moderate gravity for balance
      wind: 5, // Increased wind to help define the spiral
      colors: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722", "#FF00FF"],
      size: { min: 6, max: 25 }, // Increased size for visibility
      speedX: { min: -40, max: 40 }, // Wide range for dramatic spiraling
      speedY: { min: -50, max: -80 }, // High upward speed for strong spiraling
      rotationSpeed: { min: -25, max: 25 }, // Aggressive rotation for dynamic visuals
      emojiChance: 0.5, // Increased chance for emojis
    },
    extremeFanShape: {
      particleCount: 1000, // Increased particle count for a more substantial effect
      gravity: 0.6, // Higher gravity for faster descent
      wind: 3, // Moderate wind for spread
      colors: ["#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#FF00FF"],
      size: { min: 8, max: 30 }, // Larger size for visibility
      speedX: { min: -15, max: 15 }, // Moderate lateral speed for focused spread
      speedY: { min: -40, max: -80 }, // Strong upward motion for dramatic effect
      rotationSpeed: { min: -30, max: 30 }, // Greater rotation for excitement
      emojiChance: 0.5, // High chance of emoji presence
    },
    extremeSlowMoFlow: {
      particleCount: 1200, // High particle count for dynamic visuals
      gravity: 0.2, // Low gravity for prolonged visibility
      wind: 4, // Increased wind to help simulate wave motion
      colors: ["#FF69B4", "#00FA9A", "#FFD700", "#8A2BE2", "#FF00FF"],
      size: { min: 5, max: 25 }, // Larger size range for dramatic effect
      speedX: { min: -30, max: 30 }, // Large range for lateral movement
      speedY: { min: -20, max: -50 }, // Strong upward motion for waves
      rotationSpeed: { min: -20, max: 20 }, // Wide rotation for visual appeal
      emojiChance: 0.35, // Significant chance of emoji appearance
    },
    ultimateFanExplosion: {
      particleCount: 1500, // Maximum particle count for an overwhelming effect
      gravity: 0.7, // Higher gravity for quicker descent and more dramatic fall
      wind: 6, // Increased wind to enhance the spread effect
      colors: [
        "#FF5733", // Bright Red
        "#33FF57", // Bright Green
        "#5733FF", // Bright Blue
        "#FF33A1", // Bright Pink
        "#FFD700", // Gold
        "#00FA9A", // Light Green
        "#00FFFF", // Cyan
        "#FF4500", // Orange Red
      ], // Expanded color palette for vibrant visuals
      size: { min: 6, max: 20 }, // Reasonable size for good visibility without going overboard
      speedX: { min: -50, max: 50 }, // Wide range for dramatic lateral spread
      speedY: { min: -60, max: -100 }, // Strong upward speed for a powerful effect
      rotationSpeed: { min: -40, max: 40 }, // Aggressive rotation for dynamic visuals
      emojiChance: 0.6, // High chance for emoji inclusion to enhance the fun
    },
  };

  return presets;
}

export default ConfettiPresets;
