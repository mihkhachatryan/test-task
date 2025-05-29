import { useState, useEffect, useCallback } from 'react';
import styles from './EditModal.module.css';
import type { EditModalProps, BaseEntity } from '../types';
import { Input } from './Input';
import { Button } from './Button';
  
export function EditModal<T extends BaseEntity>({ item, onSave, onClose, fields }: EditModalProps<T>) {
    const [editedItem, setEditedItem] = useState({ ...item });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);

    const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};
      
      fields.forEach((field) => {
        const value = String(editedItem[field]).trim();
        if (!value) {
          newErrors[String(field)] = `${String(field)} cannot be empty`;
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSave = useCallback(() => {
      if (validateForm()) {
        const trimmedItem = { ...editedItem };
        fields.forEach((field) => {
          if (typeof trimmedItem[field] === 'string') {
            trimmedItem[field] = String(trimmedItem[field]).trim() as T[typeof field];
          }
        });
        onSave(trimmedItem);
      }
    }, [editedItem, fields, onSave]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        } else if (event.key === 'Enter') {
          event.preventDefault();
          handleSave();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose, handleSave]);

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div className={styles.modal} onClick={handleBackdropClick}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Edit Item</h3>
          {fields.map((key) => (
            <Input
              key={String(key)}
              label={String(key)}
              value={String(editedItem[key])}
              onChange={(e) => {
                setEditedItem({ ...editedItem, [key]: e.target.value });
                if (errors[String(key)]) {
                  setErrors({ ...errors, [String(key)]: '' });
                }
              }}
              error={errors[String(key)]}
            />
          ))}
          <div className={styles.modalActions}>
            <Button 
              variant="primary"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button 
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }