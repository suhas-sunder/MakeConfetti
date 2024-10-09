/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, vi } from "vitest";
import "../../../mocks/components/MockDefaultServerAPI";

// Mock the environment variables before each test
beforeEach(() => {
  vi.resetModules();
});

describe("Axios instance creation in trackingAPI", () => {
  let instance: any;

  it("should create an axios instance with the correct baseURL and timeout in production", async () => {
    // Simulate production environment
    (import.meta.env as any).MODE = "production";

    // Re-import the instance to pick up the new environment variable
    instance = (await import("../trackingAPI")).default;

    expect(instance.defaults.baseURL).toBe(
      "https://wordskull.com/v1/api/tracking"
    );
    expect(instance.defaults.timeout).toBe(30000);
  });

  it("should create an axios instance with the correct baseURL and timeout in development", async () => {
    (import.meta.env as any).MODE = "development"; // Default to development
    (import.meta.env as any).VITE_PORT = "3200"; // Set a default port

    instance = (await import("../trackingAPI")).default;

    expect(instance.defaults.baseURL).toBe(
      "http://localhost:3200/v1/api/tracking"
    );
    expect(instance.defaults.timeout).toBe(30000);
  });
});
