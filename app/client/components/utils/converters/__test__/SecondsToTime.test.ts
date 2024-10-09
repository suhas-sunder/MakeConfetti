import { describe, it, expect } from "vitest";
import SecondsToTime from "../SecondsToTime";

describe("converts seconds to time correctly", () => {
  it('should convert 0 seconds to "00:00:00"', () => {
    expect(SecondsToTime(0)).toBe("00:00:00");
  });

  it('should convert 59 seconds to "00:00:59"', () => {
    expect(SecondsToTime(59)).toBe("00:00:59");
  });

  it('should convert 60 seconds to "00:01:00"', () => {
    expect(SecondsToTime(60)).toBe("00:01:00");
  });

  it('should convert 3599 seconds to "00:59:59"', () => {
    expect(SecondsToTime(3599)).toBe("00:59:59");
  });

  it('should convert 3600 seconds to "01:00:00"', () => {
    expect(SecondsToTime(3600)).toBe("01:00:00");
  });

  it('should convert 3661 seconds to "01:01:01"', () => {
    expect(SecondsToTime(3661)).toBe("01:01:01");
  });

  it('should convert 86399 seconds to "23:59:59"', () => {
    expect(SecondsToTime(86399)).toBe("23:59:59");
  });

  it('should convert 86400 seconds to "24:00:00"', () => {
    expect(SecondsToTime(86400)).toBe("24:00:00"); // Edge case for 24 hours
  });

  it('should convert 90061 seconds to "25:01:01"', () => {
    expect(SecondsToTime(90061)).toBe("25:01:01"); // More than a day
  });
});
