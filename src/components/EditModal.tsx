import { useState } from 'react';
import styles from './EditModal.module.css';
import type { EditModalProps, BaseEntity } from '../types';
import { Input } from './Input';
import { Button } from './Button';
  
export function EditModal<T extends BaseEntity>({ item, onSave, onClose, fields }: EditModalProps<T>) {
    const [editedItem, setEditedItem] = useState({ ...item });
  
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Edit Item</h3>
          {fields.map((key) => (
            <Input
              key={String(key)}
              label={String(key)}
              value={String(editedItem[key])}
              onChange={(e) =>
                setEditedItem({ ...editedItem, [key]: e.target.value })
              }
            />
          ))}
          <div className={styles.modalActions}>
            <Button 
              variant="primary"
              onClick={() => onSave(editedItem)}
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