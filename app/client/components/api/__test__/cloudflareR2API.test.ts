/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from "vitest";
import { AxiosInstance } from "axios";
import "../../../mocks/components/MockCloudflareR2API";

describe("Axios instance creation in cloudflareR2API", () => {
  let instance: AxiosInstance;

  beforeEach(async () => {
    instance = (await import("../cloudflareR2API")).default;
  });

  it("should create an axios instance with the correct baseURL and timeout", () => {
    expect(instance.defaults.baseURL).toBe("https://www.honeycombartist.com");
    expect(instance.defaults.timeout).toBe(30000);
  });

  it("should make a GET request successfully", async () => {
    const mockedResponse = { data: { success: true } };

    // Use the mock implementation for the get method
    (instance.get as any).mockResolvedValueOnce(mockedResponse);

    const response = await instance.get("/some-endpoint");

    expect(response).toEqual(mockedResponse);
    expect(instance.get).toHaveBeenCalledWith("/some-endpoint");
  });
});
