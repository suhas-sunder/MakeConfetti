import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useTheme } from "../client/components/context/ThemeContext";
import { MetaFunction } from "@remix-run/node";
import Confetti from "../client/components/ui/visual/ConfettiCannon";

export const meta: MetaFunction = () => {
  return [
    {
      title: "💀 Word Skull - Sharpen Your Mind, One Word at a Time. 🎉✨",
    },
    {
      name: "description",
      content:
        "Word Skull is an engaging platform where fun meets learning.  It’s a great way to sharpen your vocabulary 📚, but it’s also just a good game to dive into when you want to relax and challenge your mind 🧩. Word Skull is the perfect way to have fun and keep your brain active 🧠! 🎉📲",
    },
  ];
};

function Header() {
  return (
    <header>
      <h1 className="w-full flex-col z-10 sm:flex-row flex justify-center gap-1 sm:gap-5 items-center text-4xl sm:text-5xl text-center mt-10 leading-snug -translate-y-[0.3em] sm:translate-y-0 sm:mt-5 sm:mb-1 text-slate-500 font-lora animate-fadeIn">
        <span className="whitespace-nowrap">
          <span className="inline-flex">W</span>
          <span className="inline-flex animate-scalePulse">💀</span>
          <span className="inline-flex">RD</span>
        </span>
        <span className="inline-flex">SKULL</span>
      </h1>
    </header>
  );
}

const difficulties = ["easy", "medium", "hard", "extreme"];

export default function Index() {
  const [difficulty, setDifficulty] = useState<string>("easy");
  const navigate = useNavigate();

  const { darkThemeActive } = useTheme();

  return (
    <div className="flex  flex-col mt-3 sm:mt-5 overflow-hidden">
      <div className="flex w-full min-h-[100vh]">
        <Confetti />
      </div>
      <Header />
      <main
        className={`${
          darkThemeActive && "text-white"
        } flex flex-col sm:gap-14  -translate-y-5 sm:translate-y-0 items-center animate-fadeIn`}
      >
        <div id="find-me" className="absolute top-1/4 left-1/2"></div>
        <button
          onClick={() => navigate(`/word-skull-game-${difficulty}-mode`)}
          className={`${
            darkThemeActive
              ? "text-white  hover:text-slate-300"
              : " text-slate-500  hover:text-slate-600"
          } flex z-10 border-2 px-4  text-xl font-nunito rounded-lg tracking-widest leading-loose border-slate-300 hover:border-slate-400`}
        >
          Play
        </button>
        <ul className="grid grid-cols-2 my-8 sm:my-0 sm:grid-cols-4 text-sm gap-4 uppercase font-nunito">
          {difficulties.map((level) => (
            <li
              key={level}
              className="flex mx-auto items-center gap-2 justify-center rounded-lg cursor-pointer group hover:border-slate-200 border-2 border-transparent"
            >
              <input
                checked={difficulty === level}
                onChange={() => setDifficulty(level)}
                id={level}
                type="radio"
                name="difficulty"
                className="hidden"
              />
              <label
                htmlFor={level}
                className="cursor-pointer flex items-center gap-2 py-2 px-4"
              >
                <div
                  className={`w-4 h-4 border rounded-full flex items-center justify-center  ${
                    difficulty === level
                      ? `${
                          darkThemeActive ? "bg-white" : "bg-slate-600"
                        } border-transparent`
                      : `${
                          darkThemeActive ? "bg-slate-700" : "bg-white"
                        } border-gray-300`
                  }`}
                >
                  <svg
                    className={`${
                      darkThemeActive
                        ? "text-slate-500 group-hover:text-white"
                        : "text-white group-hover:text-slate-500"
                    } w-3 h-3  translate-y-[0.05em] transition-opacity duration-300 ${
                      difficulty === level || "group-hover:opacity-100"
                    } ${difficulty === level ? "opacity-100" : "opacity-0"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 16.293l-4-4 1.414-1.414L9 13.465l8.586-8.586L19 6.293l-10 10z"
                    />
                  </svg>
                </div>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            </li>
          ))}
        </ul>
        <div
          id="find-me"
          className="max-w-[800px] text-center font-nunito text-lg text-slate-500"
        >
          If you have any feedback, suggestions, or business inquiries, please
          feel free to reach out to{" "}
          <a
            href="mailto:admin@wordskull.com"
            className="text-skull-dark-brown hover:text-skull-super-dark-brown"
          >
            admin@wordskull.com
          </a>
          .
        </div>
      </main>
    </div>
  );
}
