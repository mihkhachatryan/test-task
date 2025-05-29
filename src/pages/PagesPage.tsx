import { useState, useMemo } from "react";
import type { PageData } from "../types";
import { Table } from "../components/Table";
import { EditModal } from "../components/EditModal";
import { Filter } from "../components/Filter";
import { pages } from "../data/mockData";
import { applyFilters } from "../utils/filterUtils";
import type { FilterConfig } from "../types";
import { pagesTableConfig } from "../config";
import styles from "./Page.module.css";

export default function PagesPage() {
  const [data, setData] = useState<PageData[]>(pages);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [editingItem, setEditingItem] = useState<PageData | null>(null);

  const searchResults = useMemo(() => 
    applyFilters(data, filters), [data, filters]
  );

  const handleSave = (updated: PageData) => {
    setData((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingItem(null);
  };

  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.pageContent}>
        <Filter 
          searchColumn={pagesTableConfig.searchColumn}
          searchPlaceholder={pagesTableConfig.searchPlaceholder}
          onFilterChange={setFilters} 
        />

        <Table
          data={searchResults}
          columns={pagesTableConfig.columns(styles)}
          onEdit={(item) => setEditingItem(item)}
        />

        {editingItem && (
          <EditModal<PageData>
            item={editingItem}
            fields={pagesTableConfig.editableFields}
            onSave={handleSave}
            onClose={() => setEditingItem(null)}
          />
        )}
      </div>
    </div>
  );
} 