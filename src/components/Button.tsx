import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
} 