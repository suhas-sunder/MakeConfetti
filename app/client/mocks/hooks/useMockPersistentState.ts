import { useEffect, useState } from "react";

// Custom hook to manage local storage for testing
export function useMockPersistentState<T>(key: string, defaultValue: T) {
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
    // Mock localStorage methods
    const originalGetItem = window.localStorage.getItem.bind(window.localStorage);
    const originalSetItem = window.localStorage.setItem.bind(window.localStorage);

    // Mocking localStorage getItem
    window.localStorage.getItem = (k: string) => {
      if (k === key) {
        return JSON.stringify(state); // Return the current state for the given key
      }
      return originalGetItem(k); // Fallback to the original
    };

    // Mocking localStorage setItem
    window.localStorage.setItem = (k: string, value: string) => {
      if (k === key) {
        setState(JSON.parse(value)); // Update state when localStorage is set
      }
      originalSetItem(k, value); // Fallback to the original
    };

    return () => {
      // Cleanup to restore original localStorage methods and reset values
      window.localStorage.getItem = originalGetItem;
      window.localStorage.setItem = originalSetItem;
      window.localStorage.removeItem(key); // Reset the value in local storage
    };
  }, [key, state]);

  useEffect(() => {
    // Set item in local storage whenever state changes
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState] as const; // Return as a tuple
}
