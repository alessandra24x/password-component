export type PasswordRequirement =
  | "specialChar"
  | "digit"
  | "uppercase"
  | "noConsecutive";

export const validatePassword = (
  password: string,
  options: PasswordRequirement[]
) => {
  const results: Record<PasswordRequirement, boolean> = {
    specialChar:
      options.includes("specialChar") && validateSpecialChar(password),
    digit: options.includes("digit") && validateDigit(password),
    uppercase: options.includes("uppercase") && validateUppercase(password),
    noConsecutive:
      options.includes("noConsecutive") && validateNoConsecutive(password),
  };

  return results;
};

export const validateSpecialChar = (text: string) =>
  /['|°"!@#$%.¡?¿,;\-_=()+^&*\[\]{}\/]/.test(text);

export const validateDigit = (text: string) => /\d/.test(text);

export const validateUppercase = (text: string) => /[A-Z]/.test(text);

export const validateNoConsecutive = (text: string) => !/(.)\1/.test(text);
