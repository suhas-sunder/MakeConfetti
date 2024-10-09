import { vi } from "vitest";

// Mock the axios module
const mockAxiosInstance = {
  defaults: {
    baseURL: "",
    timeout: 30000,
  },
  create: vi.fn().mockImplementation((config) => {
    return {
      ...mockAxiosInstance,
      defaults: {
        ...mockAxiosInstance.defaults,
        ...config,
      },
    };
  }),
};

// Mock the import for axios
vi.mock("axios", () => {
  return {
    default: mockAxiosInstance,
  };
});

// You can also add more mocked methods if needed
export const setBaseURL = (url: string) => {
  mockAxiosInstance.defaults.baseURL = url;
};
