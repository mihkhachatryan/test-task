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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const selectedIndex = options.findIndex(option => option.value === value);
      const firstEnabledIndex = options.findIndex(option => !option.disabled);
      const initialIndex = selectedIndex >= 0 && !options[selectedIndex].disabled ? selectedIndex : firstEnabledIndex;
      setFocusedIndex(initialIndex >= 0 ? initialIndex : -1);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, options, value]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const moveToNextOption = () => {
    const nextIndex = options.findIndex((option, index) => 
      index > focusedIndex && !option.disabled
    );
    if (nextIndex >= 0) {
      setFocusedIndex(nextIndex);
    }
  };

  const moveToPreviousOption = () => {
    let prevIndex = -1;
    for (let i = focusedIndex - 1; i >= 0; i--) {
      if (!options[i].disabled) {
        prevIndex = i;
        break;
      }
    }
    if (prevIndex >= 0) {
      setFocusedIndex(prevIndex);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0 && !options[focusedIndex].disabled) {
          handleOptionClick(options[focusedIndex].value);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          moveToNextOption();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          moveToPreviousOption();
        }
        break;
    }
  };

  const handleOptionMouseEnter = (index: number) => {
    if (!options[index].disabled) {
      setFocusedIndex(index);
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
        <div className={styles.dropdownMenu} role="listbox" ref={menuRef}>
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.dropdownOption} ${
                option.value === value ? styles.selected : ''
              } ${option.disabled ? styles.optionDisabled : ''} ${
                index === focusedIndex ? styles.focused : ''
              }`}
              onClick={() => !option.disabled && handleOptionClick(option.value)}
              onMouseEnter={() => handleOptionMouseEnter(index)}
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