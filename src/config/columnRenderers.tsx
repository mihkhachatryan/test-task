
const getStatusBadgeClass = (active: boolean, styles: any) => 
  `${styles.statusBadge} ${active ? styles.statusActive : styles.statusInactive}`;

export const columnRenderers = {
  text: (value: any) => <span>{value}</span>,
  
  activeStatus: (active: boolean, styles: any) => (
    <span className={getStatusBadgeClass(active, styles)}>
      {active ? "Yes" : "No"}
    </span>
  ),
  
  date: (dateString: string | null | undefined) => (
    <span>
      {dateString ? new Date(dateString).toLocaleDateString() : "N/A"}
    </span>
  ),
  
  requiredDate: (dateString: string) => (
    <span>{new Date(dateString).toLocaleDateString()}</span>
  ),
  
  number: (value: number) => <span>{value}</span>
}; 