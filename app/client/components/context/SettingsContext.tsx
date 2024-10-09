import { createContext, useContext } from "react";
import { usePersistentState } from "../hooks/usePersistentState";
import { MockSettingsContext } from "../../../client/mocks/components/MockSettingsContext";

export type InstructionsType = {
  showInstructions: boolean;
  setShowInstructions: (value: (prevState: boolean) => boolean) => void;
};

export type KeyboardType = {
  setShowKeyboard: (value: (prevState: boolean) => boolean) => void;
  showKeyboard: boolean;
};

export type KeyboardInteractivityType = {
  setMakeKeypadInteractive: (value: (prevState: boolean) => boolean) => void;
  makeKeypadInteractive: boolean;
};

interface SettingsContextProps
  extends InstructionsType,
    KeyboardType,
    KeyboardInteractivityType {}

export const SettingsContext = createContext<SettingsContextProps>({
  showInstructions: false,
  setShowInstructions: () => {},
  showKeyboard: false,
  setShowKeyboard: () => {},
  setMakeKeypadInteractive: () => {},
  makeKeypadInteractive: true,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [showInstructions, setShowInstructions] = usePersistentState<boolean>(
    "showInstructions",
    false
  ); //Stores state in localStorage
  const [showKeyboard, setShowKeyboard] = usePersistentState<boolean>(
    "showKeyboard",
    true
  ); //Stores state in localStorage
  const [makeKeypadInteractive, setMakeKeypadInteractive] =
    usePersistentState<boolean>("makeKeypadInteractive", true); //Stores state in localStorage

  return (
    <SettingsContext.Provider
      value={{
        showInstructions,
        setShowInstructions,
        showKeyboard,
        setShowKeyboard,
        setMakeKeypadInteractive,
        makeKeypadInteractive,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// Setup actual context to run during testing so I can test this without the mock instance
export function useTestSettings() {
  return useContext(SettingsContext);
}

const isTestEnvironment = process.env.NODE_ENV === "test";

// Mock context if running tests otherwise use real context
export function useSettings() {
  const context = useContext(
    isTestEnvironment ? MockSettingsContext : SettingsContext
  );
  if (!context) {
    throw new Error("SettingsContext has not been initialized");
  }
  return context;
}
