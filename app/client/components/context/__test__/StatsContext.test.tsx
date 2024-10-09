import { render, screen, act } from "@testing-library/react";
import { StatsProvider, useTestStats } from "../StatsContext"; 

// A test component that uses the StatsContext
const TestComponent = () => {
  const { stats, setStats, difficulty, setDifficulty, gameMode, setGameMode } =
    useTestStats();

  return (
    <div>
      <div data-testid="difficulty">{difficulty}</div>
      <div data-testid="gameMode">{gameMode}</div>
      <div data-testid="stats">{JSON.stringify(stats)}</div>
      <button
        onClick={() =>
          setStats((prev) => [
            ...prev,
            {
              id: "1",
              date: "2023-10-06",
              totalLives: 3,
              livesLeft: 2,
              totalWords: 100,
              correctWords: 80,
              timeSpentSec: 120,
              difficulty: "easy",
              gameMode: "solo",
            },
          ])
        }
      >
        Add Stat
      </button>
      <button onClick={() => setDifficulty("hard")}>Set Difficulty</button>
      <button onClick={() => setGameMode("multiplayer")}>Set Game Mode</button>
    </div>
  );
};

describe("StatsProvider", () => {
  it("should provide initial context values", () => {
    render(
      <StatsProvider>
        <TestComponent />
      </StatsProvider>
    );

    expect(screen.getByTestId("difficulty").textContent).toBe("");
    expect(screen.getByTestId("gameMode").textContent).toBe("");
    expect(screen.getByTestId("stats").textContent).toBe(JSON.stringify([])); 
  });

  it("should update stats, difficulty, and gameMode", () => {
    render(
      <StatsProvider>
        <TestComponent />
      </StatsProvider>
    );

    act(() => {
      screen.getByText("Set Difficulty").click();
    });
    expect(screen.getByTestId("difficulty").textContent).toBe("hard");

    act(() => {
      screen.getByText("Set Game Mode").click();
    });
    expect(screen.getByTestId("gameMode").textContent).toBe("multiplayer");

    act(() => {
      screen.getByText("Add Stat").click();
    });
    expect(screen.getByTestId("stats").textContent).toContain("1");
  });
});
