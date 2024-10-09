import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useContext, useEffect } from "react";
import MockThemeProvider, { MockThemeContext } from "./MockThemeContext";
import Header from "../../components/layout/Header";

interface MockHeaderProps {
  darkThemeActive: boolean;
  lives: number | null;
  isGameOver: boolean;
  lettersPerSkull?: string;
  dontFade?: boolean;
  showKeyboard: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  setShowKeyboard: (value: (prevState: boolean) => boolean) => void;
}

const MockHeader = ({
  darkThemeActive,
  lives,
  isGameOver,
  lettersPerSkull = "Easy",
  dontFade = false,
  setShowGameOverMenu,
}: MockHeaderProps) => {
  // Render Header component inside MemoryRouter and MockThemeProvider
  return render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={darkThemeActive}>
        <Header
          lives={lives}
          isGameOver={isGameOver}
          lettersPerSkull={lettersPerSkull}
          dontFade={dontFade}
          setShowGameOverMenu={setShowGameOverMenu}
        />
        <ToggleButton darkThemeActive={darkThemeActive} />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

// Define the ToggleButton component separately
const ToggleButton = ({ darkThemeActive }: { darkThemeActive: boolean }) => {
  const { setDarkThemeActive } = useContext(MockThemeContext);
  useEffect(() => {
    setDarkThemeActive(darkThemeActive);
  }, [darkThemeActive, setDarkThemeActive]);

  return <></>;
};

export default MockHeader;
