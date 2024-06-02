import { describe, it, expect } from "vitest";
import {
  validatePassword,
  validateSpecialChar,
  validateDigit,
  validateUppercase,
  validateNoConsecutive,
  PasswordRequirement,
} from "./validatePassword";

describe("validateSpecialChar", () => {
  it("should return true if the text contains special characters", () => {
    expect(validateSpecialChar("red!")).toBe(true);
    expect(validateSpecialChar("Love#Story1")).toBe(true);
    expect(validateSpecialChar("peter%")).toBe(true);
    expect(validateSpecialChar("d%elicate")).toBe(true);
    expect(validateSpecialChar("reput+ation")).toBe(true);
    expect(validateSpecialChar("ttpd.")).toBe(true);
    expect(validateSpecialChar("*debut")).toBe(true);
    expect(validateSpecialChar("Cruel?Summer¡")).toBe(true);
  });

  it("should return false if the text does not contain special characters", () => {
    expect(validateSpecialChar("midnights")).toBe(false);
    expect(validateSpecialChar("Fortnight")).toBe(false);
    expect(validateSpecialChar("the 1")).toBe(false);
  });
});

describe("validateDigit", () => {
  it("should return true if the text contains a digit", () => {
    expect(validateDigit("lover13")).toBe(true);
    expect(validateDigit("22*Style")).toBe(true);
    expect(validateDigit("Fearless1989")).toBe(true);
  });

  it("should return false if the text does not contain a digit", () => {
    expect(validateDigit("Maroon")).toBe(false);
    expect(validateDigit("SpeakNow")).toBe(false);
    expect(validateDigit("_loml")).toBe(false);
  });
});

describe("validateUppercase", () => {
  it("should return true if the text contains an uppercase letter", () => {
    expect(validateUppercase("Daylight")).toBe(true);
    expect(validateUppercase("Karma")).toBe(true);
  });

  it("should return false if the text does not contain an uppercase letter", () => {
    expect(validateUppercase("august")).toBe(false);
    expect(validateUppercase("evermore")).toBe(false);
  });
});

describe("validateNoConsecutive", () => {
  it("should return true if the text does not contain consecutive identical characters", () => {
    expect(validateNoConsecutive("taylor")).toBe(true);
    expect(validateNoConsecutive("swift")).toBe(true);
    expect(validateNoConsecutive("Folklore@21")).toBe(true);
  });

  it("should return false if the text contains consecutive identical characters", () => {
    expect(validateNoConsecutive("willow")).toBe(false);
    expect(validateNoConsecutive("betty")).toBe(false);
  });
});

describe("validatePassword", () => {
  it("should validate password according to the given requirements", () => {
    const password = "Bejeweled1!";

    const options: PasswordRequirement[] = [
      "specialChar",
      "digit",
      "uppercase",
      "noConsecutive",
    ];

    const result = validatePassword(password, options);

    expect(result.specialChar).toBe(true);
    expect(result.digit).toBe(true);
    expect(result.uppercase).toBe(true);
    expect(result.noConsecutive).toBe(true);
  });

  it("should validate password with only some requirements", () => {
    const password = "mirrorball";

    const options: PasswordRequirement[] = ["specialChar", "digit"];

    const result = validatePassword(password, options);

    expect(result.specialChar).toBe(false);
    expect(result.digit).toBe(false);
    expect(result.uppercase).toBe(false);
    expect(result.noConsecutive).toBe(false);
  });

  it("should return false for all requirements if password does not meet any", () => {
    const password = "abc";

    const options: PasswordRequirement[] = [
      "specialChar",
      "digit",
      "uppercase",
      "noConsecutive",
    ];

    const result = validatePassword(password, options);

    expect(result.specialChar).toBe(false);
    expect(result.digit).toBe(false);
    expect(result.uppercase).toBe(false);
    expect(result.noConsecutive).toBe(true);
  });
});
