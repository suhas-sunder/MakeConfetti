/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useState } from "react";

export const MockThemeContext = createContext({
  darkThemeActive: false,
  setDarkThemeActive: (value: boolean) => {},
});

export default function MockThemeProvider({
  children,
  darkThemeActive,
}: {
  children: ReactNode;
  darkThemeActive: boolean;
}) {
  const [isDarkTheme, setDarkThemeActive] = useState(darkThemeActive);

  // This function matches the expected type
  const mockSetDarkThemeActive = (value: boolean) => {
    setDarkThemeActive(value);
  };

  return (
    <MockThemeContext.Provider
      value={{
        darkThemeActive: isDarkTheme,
        setDarkThemeActive: mockSetDarkThemeActive,
      }}
    >
      {children}
    </MockThemeContext.Provider>
  );
}
