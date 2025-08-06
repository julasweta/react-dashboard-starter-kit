import type { ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from 'classnames';

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
}

export const Button = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames(
        styles.button,
        styles[variant],
        { [styles.disabled]: disabled || loading }
      )}
    >
      {loading && <span className={styles.loader}></span>}
      {children}
    </button>
  );
};
