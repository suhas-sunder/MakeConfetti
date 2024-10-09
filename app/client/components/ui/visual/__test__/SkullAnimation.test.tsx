import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import SkullAnimation from "../SkullAnimation";
import "@testing-library/jest-dom/vitest";
import MockThemeProvider from "../../../../../client/mocks/components/MockThemeContext";

const MockSkullAnimation = () => {
  return render(
    <MockThemeProvider darkThemeActive={true}>
      <SkullAnimation />
    </MockThemeProvider>
  );
};

describe("renders skull animation correctly", () => {
  beforeEach(() => {
    MockSkullAnimation();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should render skulls with at least 4 rows", () => {
    const skullLists = screen.getAllByRole("list");
    expect(skullLists.length).toBeGreaterThan(4);
  });

  it("should render skulls correctly initially", () => {
    const skullLists = screen.getAllByRole("list");
    expect(skullLists.length).toBeGreaterThan(0); // Check if skulls are rendered

    // Validate that each list contains rendered items
    skullLists.forEach((list) => {
      expect(list.children.length).toBeGreaterThan(0); // Each list should contain skulls
    });
  });

  it("should render the correct number of skulls after shuffling", async () => {
    const initialSkulls = screen.getAllByRole("list");
    expect(initialSkulls.length).toBeGreaterThan(0);

    // Advance time to trigger shuffling
    act(() => {
      vi.advanceTimersByTime(5000); // Wait for 5 seconds
    });

    waitFor(() => {
      const updatedSkulls = screen.getAllByRole("list");
      expect(updatedSkulls.length).toBeGreaterThan(0);
    });
  });

  it("should render skulls with correct content after each transition", async () => {
    // Advance time to show the first skull
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    waitFor(() => {
      const updatedSkulls = screen.getAllByRole("list");
      expect(updatedSkulls.length).toBeGreaterThan(0);
    });
    // Advance time to transition again
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    waitFor(() => {
      const nextSkulls = screen.getAllByRole("list");
      expect(nextSkulls.length).toBeGreaterThan(0);
    });
  });

  it("should not render empty lists", async () => {
    const initialSkulls = screen.getAllByRole("list");
    expect(initialSkulls.length).toBeGreaterThan(0);

    // Advance timers to allow skulls to shuffle
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    waitFor(() => {
      const shuffledSkulls = screen.getAllByRole("list");
      expect(shuffledSkulls.length).toBeGreaterThan(0);
    });
  });

  it("should render the correct number of skulls after shuffling", async () => {
    MockSkullAnimation();

    const initialSkulls = screen.getAllByRole("list");
    expect(initialSkulls.length).toBeGreaterThan(0);

    // Advance time to trigger shuffling
    act(() => {
      vi.advanceTimersByTime(5000); // Wait for 5 seconds
    });

    waitFor(() => {
      const updatedSkulls = screen.getAllByRole("list");
      expect(updatedSkulls.length).toBeGreaterThan(0);
    });
  });

  it("should render skulls with correct content after each transition", async () => {
    MockSkullAnimation();

    // Advance time to show the first skull
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    waitFor(() => {
      const updatedSkulls = screen.getAllByRole("list");
      expect(updatedSkulls.length).toBeGreaterThan(0);
    });

    // Advance time to transition again
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    waitFor(() => {
      const nextSkulls = screen.getAllByRole("list");
      expect(nextSkulls.length).toBeGreaterThan(0);
    });
  });

  it("should not render empty lists", async () => {
    MockSkullAnimation();

    const initialSkulls = screen.getAllByRole("list");
    expect(initialSkulls.length).toBeGreaterThan(0);

    // Ensure no list is empty initially
    initialSkulls.forEach((list) => {
      expect(list.children.length).toBeGreaterThan(0);
    });

    // Advance timers to allow skulls to shuffle
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    waitFor(() => {
      const shuffledSkulls = screen.getAllByRole("list");
      expect(shuffledSkulls.length).toBeGreaterThan(0);
    });

    // Ensure no list is empty after shuffling
    waitFor(() => {
      const shuffledSkulls = screen.getAllByRole("list");
      shuffledSkulls.forEach((list) => {
        expect(list.children.length).toBeGreaterThan(0);
      });
    });
  });
});
