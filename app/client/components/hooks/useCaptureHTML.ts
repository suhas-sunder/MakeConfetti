import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";

interface PropType {
  isGameOver: boolean;
}

function useCaptureHTML({ isGameOver }: PropType) {
  const [isWebShareSupported, setIsWebShareSupported] = useState(false);
  const [imgBlob, setImgBlob] = useState<Blob | null>(null);

  useEffect(() => {
    // Check if Web Share API is supported
    setIsWebShareSupported(!!navigator.share);

    const handleCapture = async () => {
      const captureArea = captureAreaRef.current;
      if (!captureArea) return;

      // Temporarily remove the fade-in animation
      captureArea.classList.remove("animate-fadeIn");

      try {
        // Capture the element as a blob
        setImgBlob((await captureElementAsBlob("capture-area")) as Blob);
      } catch (error) {
        console.error("Error capturing element:", error);
      }
    };

    if (isGameOver && imgBlob === null) {
      handleCapture();
    }
  }, [imgBlob, isGameOver]);

  const captureAreaRef = useRef<HTMLDivElement>(null);

  async function captureElementAsBlob(elementId: string): Promise<Blob | null> {
    const element = document.getElementById(elementId);

    if (!element) {
      throw new Error(`Element with id ${elementId} not found`);
    }

    const canvas = await html2canvas(element);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  }

  const downloadPuzzle = () => {
    if (imgBlob) {
      const url = URL.createObjectURL(imgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "screenshot.png";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const copyImageToClipboard = async () => {
    try {
      if (!navigator.clipboard || !window.ClipboardItem) {
        alert(
          "Clipboard API not supported. Please manually download the image."
        );
        return;
      }

      if (imgBlob) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": imgBlob,
          }),
        ]);
      } else {
        const blob = (await captureElementAsBlob("capture-area")) as Blob;
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          setImgBlob(blob);
        }
      }
    } catch (error) {
      console.error("Failed to copy image to clipboard:", error);
      alert(
        "Failed to copy image to clipboard. Please manually download the image."
      );
    }
  };

  const shareImage = async () => {
    if (isWebShareSupported) {
      try {
        if (imgBlob) {
          const file = new File([imgBlob], "screenshot.png", {
            type: "image/png",
          });
          await navigator.share({
            title: "Check this out!",
            text: "I captured this image.",
            files: [file],
          });
        } else {
          const blob = (await captureElementAsBlob("capture-area")) as Blob;
          if (blob) {
            const file = new File([blob], "screenshot.png", {
              type: "image/png",
            });
            await navigator.share({
              title: "Check this out!",
              text: "I captured this image.",
              files: [file],
            });
            setImgBlob(blob);
            console.log("Image captured and shared successfully!");
          }
        }
      } catch (error) {
        console.error("Error sharing image:", error);
        alert("Failed to share image.");
      }
    } else {
      // Fallback: copy image to clipboard or download
      alert("Web Share API not supported. Copying image to clipboard.");
      copyImageToClipboard();
    }
  };

  return {
    downloadPuzzle,
    copyImageToClipboard,
    shareImage,
    isWebShareSupported,
    imgBlob,
    captureAreaRef,
  };
}

export default useCaptureHTML;
