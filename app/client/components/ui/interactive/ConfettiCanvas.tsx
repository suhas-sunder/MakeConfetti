import { useEffect, useState } from "react";
import useOnlyOnClient from "../../hooks/useOnlyOnClient";
import Debounce from "../../utils/generators/Debounce";
import { Presets } from "../../data/ConfettiPresets";

interface PropType {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  startCannonAtFindMe: () => void;
  presets: Presets;
  showConfetti: boolean;
  setShowConfetti: (value: boolean) => void;
  showEmojis: boolean;
  setShowEmojis: (value: boolean) => void;
  selectedPreset: string;
  setSelectedPreset: (value: string) => void;
}

function ConfettiCanvas({
  canvasRef,
  startCannonAtFindMe,
  presets,
  showConfetti,
  setShowConfetti,
  showEmojis,
  setShowEmojis,
  selectedPreset,
  setSelectedPreset,
}: PropType) {
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

  const isClient = useOnlyOnClient(); // Ensure code runs only on the client side

  // Update canvas size whenever dimensions change
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = canvasDimensions.width;
      canvasRef.current.height = canvasDimensions.height;
    }
  }, [canvasDimensions, canvasRef]);

  // Handle window resizing
  useEffect(() => {
    if (!isClient) return;

    const handleResize = Debounce(() => {
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

  return (
    <>
      <div className="absolute bottom-0 flex-col z-20 gap-5 flex w-full justify-center items-center">
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
          className="absolute min-h-[100vh] w-full h-full flex flex-col justify-center items-center "
          style={{ pointerEvents: "none" }} // Allows interaction for buttons etc. below canvas. Remove this or set it to "auto" to disable pointer events below canvas.
        />
      )}
    </>
  );
}

export default ConfettiCanvas;
