import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import useKeyPress from "../useKeyPress";
import "@testing-library/jest-dom/vitest";
import { act } from "react";

// Test component to integrate the hook
const TestComponent = () => {
  const { keyPressed } = useKeyPress();
  return <div>Key Pressed: {keyPressed || "None"}</div>;
};

describe("should handle key presse events correctly", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Fake timers to control setTimeout behavior
    render(<TestComponent />);
  });

  afterEach(() => {
    vi.useRealTimers(); // Restore real timers after each test
  });

  it("should initialize with no key pressed", () => {
    // Initially, keyPressed should be an empty string
    expect(screen.getByText("Key Pressed: None")).toBeInTheDocument();
  });

  it("should update keyPressed on keydown", () => {
    // Simulate keydown event for the 'a' key
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(event);
    });

    // After keydown, keyPressed should update to 'a'
    expect(screen.getByText("Key Pressed: a")).toBeInTheDocument();
  });

  it("should reset keyPressed after keyup with 100ms delay", () => {
    // Simulate keydown event for the 'a' key
    act(() => {
      const keydownEvent = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(keydownEvent);
    });

    // Verify keyPressed is set to 'a'
    expect(screen.getByText("Key Pressed: a")).toBeInTheDocument();

    // Simulate keyup event for the 'a' key
    act(() => {
      const keyupEvent = new KeyboardEvent("keyup", { key: "a" });
      window.dispatchEvent(keyupEvent);
    });

    // After keyup, the keyPressed should be reset, but we need to fast-forward the timer
    act(() => {
      vi.runAllTimers(); // Fast forward the timer
    });

    // Now, keyPressed should be reset to an empty string
    expect(screen.getByText("Key Pressed: None")).toBeInTheDocument();
  });

  it("should not update keyPressed if key is already pressed", () => {
    // Simulate keydown event for the 'a' key
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(event);
    });

    // Verify keyPressed is set to 'a'
    expect(screen.getByText("Key Pressed: a")).toBeInTheDocument();

    // Simulate another keydown event for the same 'a' key
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(event);
    });

    // keyPressed should still be 'a' and should not reset
    expect(screen.getByText("Key Pressed: a")).toBeInTheDocument();
  });

  it("should not update keyPressed if another key is pressed while holding the current key", () => {
    fireEvent.keyDown(window, { key: "a" });
    expect(screen.getByText("Key Pressed: a")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "b" });
    expect(screen.getByText("Key Pressed: a")).toBeInTheDocument(); // Key shouldn't change to 'b' while 'a' is pressed
  });

  it("should update keyPressed when another key is pressed after releasing the current key", () => {
    act(() => {
      fireEvent.keyDown(window, { key: "a" });
    });
    expect(screen.getByText("Key Pressed: a")).toBeInTheDocument();

    act(() => {
      fireEvent.keyUp(window, { key: "a" });
      vi.advanceTimersByTime(100); // Wait for keyup timeout
    });

    act(() => {
      fireEvent.keyDown(window, { key: "b" });
    });

    expect(screen.getByText("Key Pressed: b")).toBeInTheDocument();
  });

  it("should clear keyPressed state if keyup event doesn't match the currently pressed key", () => {
    fireEvent.keyDown(window, { key: "a" });
    expect(screen.getByText("Key Pressed: a")).toBeInTheDocument();

    fireEvent.keyUp(window, { key: "b" }); // keyUp doesn't match keyDown
    vi.advanceTimersByTime(100);
    expect(screen.getByText("Key Pressed: a")).toBeInTheDocument(); // Key should still be 'a' since 'b' wasn't pressed
  });
});
