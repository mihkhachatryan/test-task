import { useState, useMemo } from "react";
import type { PricePlan } from "../types";
import { Table } from "../components/Table";
import { EditModal } from "../components/EditModal";
import { Filter } from "../components/Filter";
import { pricePlans } from "../data/mockData";
import { applyFilters } from "../utils/filterUtils";
import type { FilterConfig } from "../types";
import styles from "./Page.module.css";

export default function PricePlansPage() {
  const [data, setData] = useState<PricePlan[]>(pricePlans);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [editingItem, setEditingItem] = useState<PricePlan | null>(null);

  const filteredData = useMemo(() => 
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
          searchColumn="description"
          searchPlaceholder="Search by description..."
          onFilterChange={setFilters} 
        />

        <Table
          data={filteredData}
          columns={[
            {
              key: "description",
              label: "Description",
              render: (item) => <span>{item.description}</span>,
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
            {
              key: "removedAt",
              label: "Removed At",
              render: (item) => (
                <span>{item.removedAt ? new Date(item.removedAt).toLocaleDateString() : "N/A"}</span>
              ),
            },
          ]}
          onEdit={(item) => setEditingItem(item)}
        />

        {editingItem && (
          <EditModal<PricePlan>
            item={editingItem}
            fields={["description"]}
            onSave={handleSave}
            onClose={() => setEditingItem(null)}
          />
        )}
      </div>
    </div>
  );
} 