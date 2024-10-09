import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
export const meta: MetaFunction = () => {
  return [
    { title: "🗺️ Emoji Kitchen Game Sitemap!" },
    {
      name: "description",
      content:
        "🗺️ Meta Description: Explore our comprehensive sitemap to navigate through our website effortlessly. Find links to all our main sections, including content pages, features, and resources, to quickly access what you're looking for. 🔍",
    },
  ];
};

export default function Sitemap() {
  return (
    <div className="flex justify-center gap-10  leading-loose tracking-widest flex-col items-center mx-10">
      <header>
        <h1 className=" font-lora text-center text-slate-500 translate-y-10 text-2xl mx-5 sm:text-3xl">
          Sitemap
        </h1>
      </header>
      <main className="max-w-[1200px]  my-10 text-skull-brown text-lg flex gap-16 flex-col mb-64 w-full">
        <ol className="flex  flex-col list-decimal font-nunito mr-auto">
          <li>
            <Link to="/" className=" hover:text-sky-400 flex mr-auto">
              Word Skull (Home)
            </Link>
          </li>
          <li>
            <Link to="/games" className="hover: hover:text-sky-400">
              Games
            </Link>
          </li>
          <li>
            <Link to="/stats" className="hover: hover:text-sky-400">
              Stats
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover: hover:text-sky-400">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/settings" className="hover: hover:text-sky-400">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/rules" className="hover: hover:text-sky-400">
              Rules
            </Link>
          </li>
          <li>
            <Link to="/faq" className="hover: hover:text-sky-400">
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/terms-of-service" className="hover: hover:text-sky-400">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/cookies-policy" className="hover: hover:text-sky-400">
              Cookies Policy
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="hover: hover:text-sky-400">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="http://www.emojikitchengame.com/"
              className="hover: hover:text-sky-400"
              rel="noreferrer"
            >
              Emoji Kitchen Game
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://freetypingcamp.com/"
              className="hover: hover:text-sky-400"
              rel="noreferrer"
            >
              Free Typing Camp
            </Link>
          </li>
        </ol>
      </main>
    </div>
  );
}
