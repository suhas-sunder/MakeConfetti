import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
// import LogoImg from "../../../client/assets/images/logo_img.jpg";

interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
  darkThemeActive: boolean | null;
}

//Used by NavBar.tsx component
function Logo({ setShowMobileMenu, darkThemeActive }: PropTypes) {
  return (
    <NavLink
      data-testid="logo-naviation-link"
      onClick={() => setShowMobileMenu(false)}
      aria-label="freetypingcamp.com logo as navigation link with highlight when hovered or clicked"
      to="/"
      className={`${styles.logo} relative flex items-center  font-overlock text-[1.25rem] font-black italic tracking-wider gap-1`}
    >
      <span className="h-[50px] w-[50px] flex justify-center items-center text-4xl">🎉</span>
      <div className="hidden sm:flex">
        <p
          className={`font-Overlock text-sm sm:text-xl italic font-bold ${darkThemeActive && "text-white"} ${styles["logo-long"]}`}
        >
          MakeConfetti
        </p>
        <p
          className={`font-overlock text-sm sm:text-xl italic ${darkThemeActive && "text-white"} font-bold ${styles["logo-com"]}`}
        >
          .com
        </p>
      </div>
    </NavLink>
  );
}

export default Logo;
