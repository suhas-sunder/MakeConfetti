import { createContext, useContext, useState } from "react";
import { MockStatsContext } from "../../mocks/components/MockStatsContext";
import { usePersistentState } from "../hooks/usePersistentState";

export type StatsDataType = {
  id: string;
  date: string;
  totalLives: number;
  livesLeft: number;
  totalWords: number;
  correctWords: number;
  timeSpentSec: number;
  difficulty: string;
  gameMode: string;
}[];

export type StatsType = {
  setStats: (value: (prevState: StatsDataType) => StatsDataType) => void;
  stats: StatsDataType;
};

interface StatsContextProps extends StatsType {
  difficulty: string;
  setDifficulty: (value: string) => void;
  gameMode: string;
  setGameMode: (value: string) => void;
}

export const StatsContext = createContext<StatsContextProps>({
  stats: [
    {
      id: "",
      date: "",
      totalLives: 0,
      livesLeft: 0,
      totalWords: 0,
      correctWords: 0,
      timeSpentSec: 0,
      difficulty: "",
      gameMode: "",
    },
  ],
  setStats: () => {},
  difficulty: "",
  setDifficulty: () => {},
  gameMode: "",
  setGameMode: () => {},
});

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = usePersistentState<StatsDataType>("stats", []);
  const [difficulty, setDifficulty] = useState<string>("");
  const [gameMode, setGameMode] = useState<string>("");

  return (
    <StatsContext.Provider
      value={{
        stats,
        setStats,
        difficulty,
        setDifficulty,
        gameMode,
        setGameMode,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

// Setup actual context to run during testing so I can test this without the mock instance
export function useTestStats() {
  return useContext(StatsContext);
}

const isTestEnvironment = process.env.NODE_ENV === "test";

// Mock context if running tests otherwise use real context
export function useStats() {
  const context = useContext(
    isTestEnvironment ? MockStatsContext : StatsContext
  );
  if (!context) {
    throw new Error("StatsContext has not been initialized");
  }
  return context;
}
