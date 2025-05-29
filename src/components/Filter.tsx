import { useState } from 'react';
import styles from './Filter.module.css';
import type { FilterConfig, FilterProps, DropdownOption } from '../types';
import { Dropdown } from './Dropdown';
import { Input } from './Input';

export function Filter({ searchColumn, searchPlaceholder = "Search...", onFilterChange }: FilterProps) {
  const [searchValue, setSearchValue] = useState('');
  const [activeStatus, setActiveStatus] = useState('');

  const statusOptions: DropdownOption[] = [
    { value: '', label: 'All Status' },
    { value: 'true', label: 'Active only' },
    { value: 'false', label: 'Inactive only' }
  ];

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateFilters(value, activeStatus);
  };

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    updateFilters(searchValue, status);
  };

  const updateFilters = (search: string, status: string) => {
    const filters: FilterConfig[] = [];

    if (search.trim()) {
      filters.push({
        column: searchColumn,
        type: 'text',
        value: search.trim()
      });
    }

    if (status) {
      filters.push({
        column: 'active',
        type: 'boolean',
        value: status
      });
    }

    onFilterChange(filters);
  };

  const searchIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  );

  return (
      <div className={styles.filterRow}>
        <Input
          type="text"
          variant="search"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          icon={searchIcon}
          containerClassName={styles.searchGroup}
        />

        <div className={styles.statusGroup}>
          <Dropdown
            options={statusOptions}
            value={activeStatus}
            onChange={handleStatusChange}
            placeholder="All Status"
            className={styles.statusDropdown}
          />
        </div>
      </div>
  );
} 