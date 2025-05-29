import type { FilterConfig, BaseEntity } from "../types";

export function applyFilters<T extends BaseEntity>(
  data: T[],
  filters: FilterConfig[]
): T[] {
  if (filters.length === 0) {
    return data;
  }

  return data.filter(item => {
    return filters.every(filter => {
      if (!filter.value) return true;

      const value = getNestedValue(item as Record<string, unknown>, filter.column);
      
      switch (filter.type) {
        case 'text': {
          return String(value)
            .toLowerCase()
            .includes(filter.value.toLowerCase());
        }
            
        case 'boolean': {
          return String(value) === filter.value;
        }
          
        case 'number': {
          const numValue = Number(value);
          const filterNum = Number(filter.value);
          if (isNaN(numValue) || isNaN(filterNum)) return false;
          return numValue === filterNum;
        }
          
        default:
          return true;
      }
    });
  });
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string): unknown => {
    return current && typeof current === 'object' && current !== null && key in current
      ? (current as Record<string, unknown>)[key]
      : undefined;
  }, obj);
}
