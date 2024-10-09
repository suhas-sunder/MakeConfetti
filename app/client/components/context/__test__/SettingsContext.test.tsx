import { render, screen, act } from "@testing-library/react";
import { SettingsProvider, useTestSettings } from "../SettingsContext";

// A test component that uses the SettingsContext
const TestComponent = () => {
  const {
    showInstructions,
    setShowInstructions,
    showKeyboard,
    setShowKeyboard,
    makeKeypadInteractive,
    setMakeKeypadInteractive,
  } = useTestSettings();

  return (
    <div>
      <div data-testid="showInstructions">{showInstructions.toString()}</div>
      <div data-testid="showKeyboard">{showKeyboard.toString()}</div>
      <div data-testid="makeKeypadInteractive">
        {makeKeypadInteractive.toString()}
      </div>
      <button onClick={() => setShowInstructions((prev) => !prev)}>
        Toggle Instructions
      </button>
      <button onClick={() => setShowKeyboard((prev) => !prev)}>
        Toggle Keyboard
      </button>
      <button onClick={() => setMakeKeypadInteractive((prev) => !prev)}>
        Toggle Keypad Interactivity
      </button>
    </div>
  );
};

describe("SettingsProvider", () => {
  it("should provide initial context values", () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    expect(screen.getByTestId("showInstructions").textContent).toBe("false");
    expect(screen.getByTestId("showKeyboard").textContent).toBe("true");
    expect(screen.getByTestId("makeKeypadInteractive").textContent).toBe(
      "true"
    );
  });

  it("should update showInstructions when toggled", () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    // Toggle showInstructions
    act(() => {
      screen.getByText("Toggle Instructions").click();
    });
    expect(screen.getByTestId("showInstructions").textContent).toBe("true");

    // Toggle again
    act(() => {
      screen.getByText("Toggle Instructions").click();
    });
    expect(screen.getByTestId("showInstructions").textContent).toBe("false");
  });

  it("should update showKeyboard when toggled", () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    // Toggle showKeyboard
    act(() => {
      screen.getByText("Toggle Keyboard").click();
    });
    expect(screen.getByTestId("showKeyboard").textContent).toBe("false");

    // Toggle again
    act(() => {
      screen.getByText("Toggle Keyboard").click();
    });
    expect(screen.getByTestId("showKeyboard").textContent).toBe("true");
  });

  it("should update makeKeypadInteractive when toggled", () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    // Toggle makeKeypadInteractive
    act(() => {
      screen.getByText("Toggle Keypad Interactivity").click();
    });
    expect(screen.getByTestId("makeKeypadInteractive").textContent).toBe(
      "false"
    );

    // Toggle again
    act(() => {
      screen.getByText("Toggle Keypad Interactivity").click();
    });
    expect(screen.getByTestId("makeKeypadInteractive").textContent).toBe(
      "true"
    );
  });
});
