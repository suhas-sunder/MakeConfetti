import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTestTheme } from "../ThemeContext";
import "@testing-library/jest-dom/vitest";

// A test component to use the ThemeProvider context
const TestComponent = () => {
  const { darkThemeActive, setDarkThemeActive } = useTestTheme();

  return (
    <div>
      <p data-testid="theme-status">
        {`Theme is ${darkThemeActive ? "Dark" : "Light"}`}
      </p>
      <button onClick={() => setDarkThemeActive(!darkThemeActive)}>
        Toggle Theme
      </button>
    </div>
  );
};

afterEach(() => {
  // Clean up the localStorage after each test
  localStorage.clear();
});

describe("ThemeProvider", () => {
  it("should initialize darkThemeActive based on localStorage", () => {
    // Set a value in localStorage before rendering the provider
    localStorage.setItem("darkThemeActive", "true");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Check if the initial theme status is dark
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Dark"
    );
  });

  it("should toggle darkThemeActive and update localStorage", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Initial check, assuming default is Light
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Light"
    );

    // Toggle the theme
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    // Check if it has changed to Dark
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Dark"
    );

    // Verify localStorage
    expect(localStorage.getItem("darkThemeActive")).toBe("true");

    // Toggle back to Light
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    // Check if it has changed back to Light
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Light"
    );

    // Verify localStorage
    expect(localStorage.getItem("darkThemeActive")).toBe("false");
  });

  it("should handle initial null state", () => {
    // Clear localStorage to simulate the absence of a theme setting
    localStorage.clear();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Check if the initial theme status is Light
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Light"
    );
  });

  it("should maintain darkThemeActive state after a refresh", () => {
    // Set initial theme state in localStorage
    localStorage.setItem("darkThemeActive", "true");

    // Render the ThemeProvider and TestComponent
    const { rerender } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Check initial state (should be dark)
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Dark"
    );

    // Simulate a refresh by rerendering the component
    rerender(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Check if the state persists after rerendering
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Dark"
    );
  });

  it("should initialize to Light theme if no localStorage entry exists", () => {
    // Ensure localStorage is empty
    localStorage.clear();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Light"
    );
  });

  it("should correctly provide context values", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Light"
    );

    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Dark"
    );
  });

  it("should toggle the theme correctly when the button is clicked", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: /toggle theme/i });

    // Initially Light
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Light"
    );

    // Click to Dark
    fireEvent.click(button);
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Dark"
    );

    // Click to Light again
    fireEvent.click(button);
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Light"
    );
  });

  it("should not trigger unnecessary updates to localStorage on toggle", () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Initially Light
    expect(screen.getByTestId("theme-status")).toHaveTextContent(
      "Theme is Light"
    );

    // Click to Dark
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(setItemSpy).toHaveBeenCalledWith("darkThemeActive", "true");

    // Click to Light again
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(setItemSpy).toHaveBeenCalledWith("darkThemeActive", "false");

    // Click to Dark again
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(setItemSpy).toHaveBeenCalledWith("darkThemeActive", "true");

    // Clicking again to return to Light shouldn't trigger a new call if the state does not change
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(setItemSpy).toHaveBeenCalledTimes(5); // Total calls to localStorage

    setItemSpy.mockRestore(); // Clean up spy
  });
});
