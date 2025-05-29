export type DateString = string; 
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface BaseEntity {
  id: number;
  active: boolean;
}

export interface ProductOptions {
  size: Size;
  amount: number;
}

export interface Product extends BaseEntity {
  name: string;
  options: ProductOptions;
  createdAt: DateString;
}

export interface PricePlan extends BaseEntity {
  description: string;
  createdAt: DateString;
  removedAt: DateString; 
}

export interface PageData extends BaseEntity {
  title: string;
  updatedAt: DateString;
  publishedAt: DateString; 
}

export type FilterType = 'text' | 'boolean' | 'number';

export interface FilterConfig {
  column: string;
  type: FilterType;
  value: string;
}

export interface FilterProps {
  searchColumn: string;
  searchPlaceholder?: string;
  onFilterChange: (filters: FilterConfig[]) => void;
  className?: string;
}

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render: (item: T) => React.ReactNode;
}

export interface TableProps<T extends BaseEntity> {
  data: T[];
  columns: TableColumn<T>[];
  onEdit?: (item: T) => void;
}

export interface EditModalProps<T extends BaseEntity> {
  item: T;
  onSave: (updated: T) => void;
  onClose: () => void;
  fields: (keyof T)[];
}
