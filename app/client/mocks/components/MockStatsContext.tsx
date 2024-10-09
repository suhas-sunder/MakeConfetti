/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useState } from "react";
import { useMockPersistentState } from "../../mocks/hooks/useMockPersistentState";
import { StatsDataType } from "../../../client/components/context/StatsContext";

export const MockStatsContext = createContext({
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
  setStats: (value: (prevState: StatsDataType) => StatsDataType) => {},
  difficulty: "",
  setDifficulty: (value: string) => {},
  gameMode: "",
  setGameMode: (value: string) => {}
});

export default function MockStatsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [stats, setStats] = useMockPersistentState<StatsDataType>("stats", []);
  const [difficulty, setDifficulty] = useState<string>("");
  const [gameMode, setGameMode] = useState<string>("");

  const mockSetStats = (value: (prevState: StatsDataType) => StatsDataType) => {
    setStats((prevState: StatsDataType) => value(prevState));
  };

  return (
    <MockStatsContext.Provider
      value={{
        stats,
        setStats: mockSetStats,
        difficulty,
        setDifficulty,
        gameMode,
        setGameMode
      }}
    >
      {children}
    </MockStatsContext.Provider>
  );
}
