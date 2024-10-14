import { useTheme } from "../client/components/context/ThemeContext";
import { MetaFunction } from "@remix-run/node";
import Confetti from "../client/components/ui/visual/ConfettiCannon";
import { useDraggable } from "../client/components/hooks/useDraggable";
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const meta: MetaFunction = () => {
  return [
    {
      title: "🎉✨ Make Confetti - Make your perfect confetti. ",
    },
    {
      name: "description",
      content: "🎉📲 This confetti maker let's you make your perfect confetti!",
    },
  ];
};

function MoveMe({ id }: { id: string }) {
  useDraggable(id);
  return (
    <div id={id} className="z-[50]  flex flex-col items-center gap-4 ">
      <span className="text-6xl">🎉</span>
      <span className="">Move Me!</span>
    </div>
  );
}

function Header() {
  const { darkThemeActive } = useTheme();
  const [spawnerIds, setSpawnerIds] = useState<string[]>([
    "find-me",
    "find-me-1",
    "find-me-2",
  ]);

  const handleAddSpawner = () => {
    setSpawnerIds([...spawnerIds, "find-me-" + uuidv4()]);
  };

  return (
    <header
      className={`min-h-[100vh] flex max-w-[100vw] transition-colors duration-[600ms] ${
        darkThemeActive ? "bg-sky-950 text-white" : "bg-rose-50"
      }`}
    >
      <h1
        className={`flex absolute top-[1em] w-full transition-colors duration-[600ms] justify-center items-center  left-1/2  font-nunito  -translate-x-1/2 text-8xl ${
          darkThemeActive
            ? "text-blue-50 opacity-50"
            : "text-rose-600 opacity-30"
        }`}
      >
        🎊🥳 Make Confetti 🪅🎉
      </h1>

      <div className="flex gap-5 w-full flex-wrap items-center justify-center max-w-[1400px] mx-auto mb-auto mt-[10em]">
        {spawnerIds.map((id) => (
          <Fragment key={id + "movable-item-key"}>
            <MoveMe id={id} />
          </Fragment>
        ))}
      </div>
      <Confetti spawnerIds={spawnerIds} />
      <button
        onClick={() => handleAddSpawner()}
        className="flex absolute bottom-[20em] z-[200] justify-center w-full items-center"
      >
        Add More Confetti Spawners
      </button>
    </header>
  );
}

export default function Index() {
  const { darkThemeActive } = useTheme();

  return (
    <div className="flex  flex-col mt-3 sm:mt-5 overflow-hidden">
      <Header />
      <main
        className={`${
          darkThemeActive && "text-white"
        } flex flex-col sm:gap-14   -translate-y-5 sm:translate-y-0 items-center animate-fadeIn`}
      ></main>
    </div>
  );
}
