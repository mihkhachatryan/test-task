import { useState, useMemo } from "react";
import type { Product } from "../types";
import { Table } from "../components/Table";
import { EditModal } from "../components/EditModal";
import { Filter } from "../components/Filter";
import { products } from "../data/mockData";
import { applyFilters } from "../utils/filterUtils";
import { productsTableConfig } from "../config";
import styles from "./Page.module.css";
import type { FilterConfig } from "../types";

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>(products);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [editingItem, setEditingItem] = useState<Product | null>(null);

  const searchResults = useMemo(() => 
    applyFilters(data, filters), [data, filters]
  );

  const handleSave = (updated: Product) => {
    setData((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingItem(null);
  };

  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.pageContent}>
        <Filter 
          searchColumn={productsTableConfig.searchColumn}
          searchPlaceholder={productsTableConfig.searchPlaceholder}
          onFilterChange={setFilters} 
        />

        <Table
          data={searchResults}
          columns={productsTableConfig.columns(styles)}
          onEdit={(item) => setEditingItem(item)}
        />

        {editingItem && (
          <EditModal<Product>
            item={editingItem}
            fields={productsTableConfig.editableFields}
            onSave={handleSave}
            onClose={() => setEditingItem(null)}
          />
        )}
      </div>
    </div>
  );
}