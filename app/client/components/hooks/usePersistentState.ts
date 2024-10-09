import { useEffect, useState } from "react";

// Custom hook to manage local storage for testing
export function usePersistentState<T>(key: string, defaultValue: T) {
  // Initialize state from localStorage or default value
  const [state, setState] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const savedState = window.localStorage.getItem(key);
      if (savedState !== null) {
        return JSON.parse(savedState);
      }
    }
    return defaultValue; // Return default value if nothing is found
  });

  useEffect(() => {
    // Update localStorage whenever the state changes
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]); // Only depend on key and state

  return [state, setState] as const; // Return as a tuple
}
