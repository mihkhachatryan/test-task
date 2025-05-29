import { useState, useMemo } from "react";
import type { PricePlan } from "../types";
import { Table } from "../components/Table";
import { EditModal } from "../components/EditModal";
import { Filter } from "../components/Filter";
import { pricePlans } from "../data/mockData";
import { applyFilters } from "../utils/filterUtils";
import type { FilterConfig } from "../types";
import { pricePlansTableConfig } from "../config";
import styles from "./Page.module.css";

export default function PricePlansPage() {
  const [data, setData] = useState<PricePlan[]>(pricePlans);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [editingItem, setEditingItem] = useState<PricePlan | null>(null);

  const searchResults = useMemo(() => 
    applyFilters(data, filters), [data, filters]
  );

  const handleSave = (updated: PricePlan) => {
    setData((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingItem(null);
  };

  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.pageContent}>
        <Filter 
          searchColumn={pricePlansTableConfig.searchColumn}
          searchPlaceholder={pricePlansTableConfig.searchPlaceholder}
          onFilterChange={setFilters} 
        />

        <Table
          data={searchResults}
          columns={pricePlansTableConfig.columns(styles)}
          onEdit={(item) => setEditingItem(item)}
        />

        {editingItem && (
          <EditModal<PricePlan>
            item={editingItem}
            fields={pricePlansTableConfig.editableFields}
            onSave={handleSave}
            onClose={() => setEditingItem(null)}
          />
        )}
      </div>
    </div>
  );
} 