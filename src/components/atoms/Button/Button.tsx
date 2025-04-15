import React from "react";
import { ButtonProps, ButtonVariant } from "./Button.type";

const variantStyles = {
  [ButtonVariant.PRIMARY]: "bg-primary hover:bg-primary-dark text-white dark:bg-gray-500 dark:hover:bg-gray-600",
  [ButtonVariant.Primary_OUTLINE]: "border bg-white text-primary hover:bg-primary-dark hover:text-white dark:text-black dark:hover:bg-gray-600",
  [ButtonVariant.Danger]: "text-white bg-danger hover:bg-danger dark:bg-gray-800 dark:hover:bg-gray-600",
}

const Button: React.FC<ButtonProps> = React.memo(
  ({
    children,
    onClick,
    type = 'button',
    variant = ButtonVariant.PRIMARY,
    disabled = false,
    className,
  }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={" rounded px-4 py-2 transition-colors duration-150 " + "  " + className + " " + variantStyles[variant]}
      >
        {children}
      </button>
    );
  });

export { Button };