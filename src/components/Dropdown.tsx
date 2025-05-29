import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';
import type { DropdownProps } from '../types';

export function Dropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option", 
  disabled = false,
  className = "",
  icon
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };

  return (
    <div 
      className={`${styles.dropdown} ${className} ${disabled ? styles.disabled : ''}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`${styles.dropdownButton} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.dropdownValue}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={styles.dropdownIcon}>
          {icon || (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          )}
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.dropdownOption} ${
                option.value === value ? styles.selected : ''
              } ${option.disabled ? styles.optionDisabled : ''}`}
              onClick={() => !option.disabled && handleOptionClick(option.value)}
              disabled={option.disabled}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 