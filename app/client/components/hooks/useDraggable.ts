import { useState, useEffect } from "react";

type Position = {
  x: number;
  y: number;
};

export const useDraggable = (id: string) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState<Position | null>(null);

  useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return;

    // Update the position based on the new dimensions of the body on resize otherwise
    const updatePosition = () => {
      if (position) {
        const rect = element.getBoundingClientRect();
        const bodyRect = document.body.getBoundingClientRect();

        // Check if the element is overflowing on each side and adjust position
        let newX = position.x;
        let newY = position.y;

        if (rect.left < bodyRect.left) {
          newX = bodyRect.left; // Move to the left edge
        } else if (rect.right > bodyRect.right) {
          newX = bodyRect.right - rect.width; // Move to the right edge
        }

        if (rect.top < bodyRect.top) {
          newY = bodyRect.top; // Move to the top edge
        } else if (rect.bottom > bodyRect.bottom) {
          newY = bodyRect.bottom - rect.height; // Move to the bottom edge
        }

        // Update position only if it has changed
        if (newX !== position.x || newY !== position.y) {
          setPosition({ x: newX, y: newY });
        }
      }
    };

    // Handle mouse down event
    const handleMouseDown = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      startDragging(clientX, clientY);
      event.preventDefault();
    };

    // Handle touch start event
    const handleTouchStart = (event: TouchEvent) => {
      const { clientX, clientY } = event.touches[0]; // Get the first touch point
      startDragging(clientX, clientY);
      event.preventDefault();
    };

    const startDragging = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();
      setOffset({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });

      setIsDragging(true);
      element.style.cursor = "grabbing"; // This may not show on mobile
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && offset) {
        const rect = element.getBoundingClientRect();
        const bodyRect = document.body.getBoundingClientRect();

        // Calculate new X and Y positions
        const newX = Math.min(
          Math.max(event.clientX - offset.x + window.scrollX, bodyRect.left),
          bodyRect.right - rect.width + window.scrollX
        );

        const newY = Math.min(
          Math.max(event.clientY - offset.y + window.scrollY, bodyRect.top),
          bodyRect.bottom - rect.height + window.scrollY
        );

        setPosition({ x: newX, y: newY });
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isDragging && offset) {
        const { clientX, clientY } = event.touches[0]; // Get the first touch point
        const bodyRect = document.body.getBoundingClientRect();
        const rect = element.getBoundingClientRect();

        // Calculate new X and Y positions
        const newX = Math.min(
          Math.max(
            clientX - offset.x + window.scrollX,
            bodyRect.left + rect.width / 2
          ),
          bodyRect.right - rect.width / 2 + window.scrollX
        );

        const newY = Math.min(
          Math.max(clientY - offset.y + window.scrollY, bodyRect.top),
          bodyRect.bottom - rect.height + window.scrollY
        );

        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      stopDragging();
    };

    const handleTouchEnd = () => {
      stopDragging();
    };

    const stopDragging = () => {
      setIsDragging(false);
      setOffset(null); // Reset the offset on mouse up
      element.style.cursor = "pointer"; // This may not show on mobile
    };

    // Add event listeners for mouse and touch events
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: false }); // Prevent default for touchmove
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleTouchEnd);

    // Add resize event listener
    window.addEventListener("resize", updatePosition);

    return () => {
      // Clean up event listeners
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", updatePosition); // Clean up resize event listener
    };
  }, [id, isDragging, offset, position]);

  useEffect(() => {
    const element = document.getElementById(id);
    if (element && position) {
      element.style.position = "absolute";
      element.style.left = `${position.x}px`;
      element.style.top = `${position.y}px`;
    }
  }, [position, id]);
};
