import { vi } from "vitest";

// Mock the axios module to return the create method and the default export
vi.mock("axios", () => {
  const mockAxiosInstance = {
    defaults: {
      baseURL: "https://www.honeycombartist.com",
      timeout: 30000,
    },
    get: vi.fn(),
  };

  return {
    default: {
      create: vi.fn().mockReturnValue(mockAxiosInstance),
    },
  };
});

export {}; // This file doesn't need to export anything, just ensures it is treated as a module
