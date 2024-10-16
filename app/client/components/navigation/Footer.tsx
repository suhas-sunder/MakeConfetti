import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import { useTheme } from "../context/ThemeContext";

//Used by App.tsx component
function Footer() {
  const { darkThemeActive } = useTheme();

  return (
    <nav
      className={`${styles.nav} ${darkThemeActive && "border-slate-800" } mt-[50em] w-full border-t-2 flex gap-5 sm:gap-20 justify-center items-center py-1 sm:py-2 text-xs font-nunito  bg-white-500 `}
    >
      <div className="flex text-skull-dark-brown gap-1 font-bold tracking-widest">
        <span>&copy; 2024</span> <span className="hidden md:flex"> | </span>
        <span className="font-overlock hidden sm:flex">MakeConfetti</span>
        <span className="font-overlock sm:hidden flex">EKG</span>
        <span className="hidden md:flex"> - All Rights Reserved.</span>
      </div>
      <ul
        className={`${
          darkThemeActive ? "text-white" : "text-slate-700"
        } flex max-w-[500px] items-center justify-around `}
      >
        <li className="hidden sm:flex">
          <NavLink to="/sitemap" className="flex px-3">
            <span className={`${styles.icon}`}>Sitemap</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/privacy-policy" className="flex px-3">
            <span className={`${styles.icon}`}>Privacy</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cookies-policy" className="flex px-3">
            <span className={`${styles.icon}`}>Cookie</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/terms-of-service" className="flex px-3">
            <span className={`${styles.icon} hidden sm:flex`}>
              Terms Of Service
            </span>
            <span className={`${styles.icon} flex sm:hidden`}>Terms</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Footer;
