import styles from './Table.module.css';
import type { TableProps, BaseEntity } from '../types';
import { Button } from './Button';

export function Table<T extends BaseEntity>({ 
  data, 
  columns, 
  onEdit 
}: TableProps<T>) {
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
          {data.map((item) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}