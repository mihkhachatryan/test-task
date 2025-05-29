import styles from './Table.module.css';
import type { TableProps, BaseEntity } from '../types';
import { Button } from './Button';

export function Table<T extends BaseEntity>({ 
  data, 
  columns, 
  onEdit 
}: TableProps<T>) {
  const totalColumns = columns.length + (onEdit ? 1 : 0);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className={styles.tableHeader}>{col.label}</th>
            ))}
            {onEdit && <th key="actions" className={styles.tableHeader}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={totalColumns} className={styles.noDataCell}>
                <div className={styles.noDataContent}>
                  <div className={styles.noDataIcon}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                      <line x1="9" y1="9" x2="9.01" y2="9"/>
                      <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                  </div>
                  <h3 className={styles.noDataTitle}>No data found</h3>
                  <p className={styles.noDataMessage}>
                    There are no items to display.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className={styles.tableRow}>
                {columns.map((col) => (
                  <td key={`${item.id}-${String(col.key)}`} className={styles.tableCell}>{col.render(item)}</td>
                ))}
                {onEdit && (
                  <td key={`${item.id}-actions`} className={styles.tableCell}>
                    <Button 
                      variant="primary"
                      size="sm"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </Button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}