import { useState, useMemo } from "react";
import type { Product } from "../types";
import { Table } from "../components/Table";
import { EditModal } from "../components/EditModal";
import { Filter } from "../components/Filter";
import { products } from "../data/mockData";
import { applyFilters } from "../utils/filterUtils";
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
          searchColumn="name"
          searchPlaceholder="Search by name..."
          onFilterChange={setFilters} 
        />

        <Table
          data={searchResults}
          columns={[
            {
              key: "name",
              label: "Name",
              render: (item) => <span>{item.name}</span>,
            },
            {
              key: "size",
              label: "Size",
              render: (item) => <span>{item.options.size}</span>,
            },
            {
              key: "amount",
              label: "Amount",
              render: (item) => <span>{item.options.amount}</span>,
            },
            {
              key: "active",
              label: "Active",
              render: (item) => (
                <span className={`${styles.statusBadge} ${item.active ? styles.statusActive : styles.statusInactive}`}>
                  {item.active ? "Yes" : "No"}
                </span>
              ),
            },
            {
              key: "createdAt",
              label: "Created At",
              render: (item) => (
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              ),
            },
          ]}
          onEdit={(item) => setEditingItem(item)}
        />

        {editingItem && (
          <EditModal<Product>
            item={editingItem}
            fields={["name"]}
            onSave={handleSave}
            onClose={() => setEditingItem(null)}
          />
        )}
      </div>
    </div>
  );
}