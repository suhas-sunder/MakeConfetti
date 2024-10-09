import { renderHook, act } from "@testing-library/react";
import { usePersistentState } from "../usePersistentState"; // Adjust the path
import { vi } from "vitest";

describe("check if state is persisted", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn((key) => {
          if (key === "testKey") {
            return JSON.stringify("savedValue");
          }
          return null;
        }),
        setItem: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with value from localStorage if available", () => {
    const { result } = renderHook(() =>
      usePersistentState<string>("testKey", "defaultValue")
    );

    expect(result.current[0]).toBe("savedValue");
  });

  it("should initialize with default value if nothing in localStorage", () => {
    const { result } = renderHook(() =>
      usePersistentState<string>("anotherKey", "defaultValue")
    );

    expect(result.current[0]).toBe("defaultValue");
  });

  it("should update localStorage when state changes", () => {
    const { result } = renderHook(() =>
      usePersistentState<string>("testKey", "defaultValue")
    );

    act(() => {
      result.current[1]("newValue");
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify("newValue")
    );

    expect(result.current[0]).toBe("newValue");
  });
});
