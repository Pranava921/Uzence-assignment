// src/components/input-field/InputField.tsx
import * as React from "react";
import { cn } from "../../lib/cn";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  showClear?: boolean;
  showPasswordToggle?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled,
      invalid,
      loading,
      variant = "outlined",
      size = "md",
      showClear,
      showPasswordToggle,
      value,
      onChange,
      type = "text",
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const inputType =
      showPasswordToggle && showPassword ? "text" : type;

    const sizeClasses = {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    const variantClasses = {
      filled: "bg-gray-100 border border-gray-300",
      outlined: "border border-gray-300",
      ghost: "border-none bg-transparent",
    };

    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            className={cn(
              "rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              sizeClasses[size],
              variantClasses[variant],
              invalid ? "border-red-500" : "",
              disabled ? "bg-gray-100 cursor-not-allowed" : "",
              className
            )}
            {...props}
          />
          {showClear && value && (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => onChange?.({ target: { value: "" } } as any)}
            >
              ✕
            </button>
          )}
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          )}
        </div>
        {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
        {invalid && errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        {loading && <p className="text-sm text-gray-400">Loading...</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
