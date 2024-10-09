import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ErrorBoundary from "../ErrorBoundary";
import { useEffect } from "react";
import { MemoryRouter } from "react-router-dom";

const MockProblematicComponent = () => {
  useEffect(() => {
    class NotFoundError extends Error {
      constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
      }
    }

    throw new NotFoundError(
      "404 Not Found: The requested resource could not be found."
    );
  }, []);

  return <div>This will render initially, but then an error occurs.</div>;
};

describe("handles errors correctly", () => {
  it("should render children when there is no error", () => {
    render(
      <ErrorBoundary>
        <h1>No errors here!</h1>
      </ErrorBoundary>
    );

    expect(screen.getByText("No errors here!")).toBeInTheDocument();
  });

  it("should log error details to console", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <MockProblematicComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error caught by ErrorBoundary:",
      expect.any(Error),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });
});
