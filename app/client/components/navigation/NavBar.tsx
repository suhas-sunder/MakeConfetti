/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import Icon from "../utils/other/Icon";
import Logo from "./Logo";
import { useTheme } from "../context/ThemeContext";

interface PropType {
  showMobileMenu?: boolean;
  setShowMobileMenu: (value: boolean) => void;
  setDarkThemeActive: (value: boolean) => void;
  darkThemeActive: boolean | null;
}

function MainLinks({
  showMobileMenu,
  setShowMobileMenu,
  setDarkThemeActive,
  darkThemeActive,
}: PropType) {
  const handleLinkClick = () => setShowMobileMenu(false);

  return (
    <div className="flex ml-auto pr-3 justify-center items-center">
      <ul
        id={showMobileMenu ? "mobile-links" : "main-links"}
        className={`${
          darkThemeActive
            ? "text-white bg-slate-900"
            : "text-slate-700 bg-white"
        } text-base justify-center items-center text-center ${
          showMobileMenu ? styles["mobile-nav"] : styles["main-nav"]
        }`}
      >
        <li className="flex w-full lg:w-auto">
          <NavLink
            onClick={handleLinkClick}
            to="/about"
            className="relative flex items-center px-4 justify-center w-full lg:w-auto py-4 lg:hover:bg-transparent lg:py-3 tracking-[0.1em]"
          >
            <span className={`${styles.icon} flex`}>About</span>
          </NavLink>
        </li>
        <li className="flex w-full lg:w-auto">
          <NavLink
            onClick={handleLinkClick}
            to="/make"
            className="relative flex items-center px-4 justify-center w-full lg:w-auto py-4 lg:hover:bg-transparent lg:py-3 tracking-[0.1em]"
          >
            <span className={`${styles.icon} flex`}>Make</span>
          </NavLink>
        </li>
        <li className="flex w-full lg:w-auto">
          <NavLink
            onClick={handleLinkClick}
            to="/memes"
            className="relative flex items-center px-4 justify-center w-full lg:w-auto py-4 lg:hover:bg-transparent lg:py-3 tracking-[0.1em]"
          >
            <span className={`${styles.icon} flex`}>Memes</span>
          </NavLink>
        </li>
      </ul>
      <button
        onClick={() => setDarkThemeActive(!darkThemeActive)}
        className={`${
          darkThemeActive
            ? " bg-slate-500 hover:bg-white border-slate-600"
            : " bg-slate-100 hover:bg-slate-500"
        } transition-colors duration-[600ms] group justify-center items-center border-2 py-1/2 ml-2 cursor-pointer hover:border-skull-brown hover:border-opacity-60 flex overflow-hidden rounded-full`}
      >
        <span
          title="Toggle 'Dark' theme"
          className={`${
            darkThemeActive
              ? "transition-all duration-[600ms] group-hover:text-2xl group-hover:pr-1 pr-0 text-sm -translate-x-2 group-hover:translate-x-1"
              : "transition-all duration-[600ms] group-hover:text-sm group-hover:pr-0 pr-1 text-2xl translate-x-1 group-hover:-translate-x-2"
          }`}
        >
          🌞
        </span>
        <span
          title="Toggle 'Light' theme"
          className={`${
            darkThemeActive
              ? "transition-all duration-[600ms] group-hover:text-sm group-hover:pl-0 pl-1 text-2xl group-hover:translate-x-2 translate-x-0"
              : "transition-all duration-[600ms] group-hover:text-2xl group-hover:pl-1 pl-0 text-sm group-hover:translate-x-0 translate-x-2"
          }`}
        >
          🌝
        </span>
      </button>
    </div>
  );
}

export default function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const { darkThemeActive, setDarkThemeActive } = useTheme();

  const handleResize = useCallback(() => {
    setShowMobileMenu(false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    document.body.classList.toggle("overflow-y-hidden", showMobileMenu);
  }, [showMobileMenu]);

  return (
    <nav
      className={`${
        styles.nav
      } fixed left-0 right-0 top-0 font-nunito border-b-2 text-base tracking-widest z-[100] text-slate-700 ${
        darkThemeActive ? "bg-slate-900 border-b-slate-800" : "bg-white"
      }`}
    >
      <div
        className={`${styles["fade-in-nav"]} mx-auto flex max-w-[1400px] px-1 sm:px-4 items-center justify-between`}
      >
        <Logo
          setShowMobileMenu={setShowMobileMenu}
          darkThemeActive={darkThemeActive}
        />
        <MainLinks
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
          darkThemeActive={darkThemeActive}
          setDarkThemeActive={setDarkThemeActive}
        />
        {showMobileMenu && (
          <button
            onClick={() => setShowMobileMenu(false)}
            className="absolute bottom-0 left-0 right-0 top-[3.15em] min-h-[100vh] min-w-[100vw] bg-white bg-opacity-30"
          />
        )}
        <input
          id="burger"
          type="checkbox"
          checked={showMobileMenu}
          readOnly
          className="relative hidden"
        />
        <label
          htmlFor="burger"
          data-testid="burger-icons"
          onClick={() => setShowMobileMenu((prev) => !prev)}
          className={`${styles["burger-label"]} relative hover:cursor-pointer`}
        >
          {showMobileMenu ? (
            <Icon
              title="burger-open-icon"
              customStyle={`flex relative fill-skull-brown justify-center items-center w-7 scale-125 mr-2 ${styles["burger-close"]}`}
              icon="burgerOpen"
            />
          ) : (
            <Icon
              title="burger-closed-icon"
              customStyle={`flex fill-skull-brown relative justify-center items-center w-7 scale-125 mr-2 ${styles["burger-open"]}`}
              icon="burgerClosed"
            />
          )}
        </label>
      </div>
    </nav>
  );
}
