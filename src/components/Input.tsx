import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'search';
  icon?: React.ReactNode;
  containerClassName?: string;
}

export function Input({ 
  label, 
  error, 
  variant = 'default',
  icon,
  containerClassName,
  className,
  id,
  ...props 
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  
  return (
    <div className={`${styles.inputContainer} ${containerClassName || ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={`${styles.inputWrapper} ${variant === 'search' ? styles.searchWrapper : ''}`}>
        <input
          id={inputId}
          className={`${styles.input} ${variant === 'search' ? styles.searchInput : styles.defaultInput} ${className || ''}`}
          {...props}
        />
        {icon && (
          <div className={styles.icon}>
            {icon}
          </div>
        )}
      </div>
      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </div>
  );
} 