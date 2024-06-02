import React, { useState, ChangeEvent } from "react";
import Check from "../Check";
import Error from "../Error";
import {
  PasswordRequirement,
  validatePassword,
} from "../utils/validatePassword";
import { twMerge } from "tailwind-merge";

interface ValidationItemProps {
  children: React.ReactNode;
  success: boolean;
  className?: string;
  successColor?: string;
  errorColor?: string;
}

const ValidationItem: React.FC<ValidationItemProps> = ({
  children,
  success,
  className,
  successColor,
  errorColor,
}) => {
  return (
    <li
      className={twMerge("flex items-center gap-3", className)}
      data-testid="item"
    >
      {success ? (
        <Check
          aria-label="success"
          className={`${successColor || "text-green-500"} w-[2.5em] h-[2.5em]`}
        />
      ) : (
        <Error
          aria-label="error"
          className={`${errorColor || "text-red-500"} w-[2.5em] h-[2.5em]`}
        />
      )}
      {children}
    </li>
  );
};

interface PasswordValidatorProps {
  options: PasswordRequirement[];
  className?: string;
  inputClassName?: string;
  listClassName?: string;
  listItemClassName?: string;
  successColor?: string;
  errorColor?: string;
}

const PasswordValidator: React.FC<PasswordValidatorProps> = ({
  options,
  className,
  inputClassName,
  listClassName,
  listItemClassName,
  successColor,
  errorColor,
}) => {
  const [password, setPassword] = useState<string>("");
  const [validationResults, setValidationResults] = useState<
    Record<PasswordRequirement, boolean>
  >({
    specialChar: false,
    digit: false,
    uppercase: false,
    noConsecutive: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const results = validatePassword(newPassword, options);
    setValidationResults(results);
  };

  return (
    <div className={twMerge("flex gap-10", className)}>
      <input
        type="text"
        value={password}
        onChange={handleChange}
        placeholder="Enter your password"
        className={twMerge("h-fit flex self-center", inputClassName)}
        data-testid="password"
      />
      <ul className={listClassName}>
        {options.includes("digit") && (
          <ValidationItem
            success={validationResults.digit}
            className={listItemClassName}
            successColor={successColor}
            errorColor={errorColor}
          >
            Has a number
          </ValidationItem>
        )}
        {options.includes("specialChar") && (
          <ValidationItem
            success={validationResults.specialChar}
            className={listItemClassName}
            successColor={successColor}
            errorColor={errorColor}
          >
            Has a special char
          </ValidationItem>
        )}
        {options.includes("uppercase") && (
          <ValidationItem
            success={validationResults.uppercase}
            className={listItemClassName}
            successColor={successColor}
            errorColor={errorColor}
          >
            Has uppercase Letter
          </ValidationItem>
        )}
        {options.includes("noConsecutive") && (
          <ValidationItem
            success={validationResults.noConsecutive}
            className={listItemClassName}
            successColor={successColor}
            errorColor={errorColor}
          >
            Has no consecutive letters
          </ValidationItem>
        )}
      </ul>
    </div>
  );
};

export default PasswordValidator;
