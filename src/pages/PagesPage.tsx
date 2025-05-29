import { useState, useMemo } from "react";
import type { PageData } from "../types";
import { Table } from "../components/Table";
import { EditModal } from "../components/EditModal";
import { Filter } from "../components/Filter";
import { pages } from "../data/mockData";
import { applyFilters } from "../utils/filterUtils";
import type { FilterConfig } from "../types";
import styles from "./Page.module.css";

export default function PagesPage() {
  const [data, setData] = useState<PageData[]>(pages);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [editingItem, setEditingItem] = useState<PageData | null>(null);

  const filteredData = useMemo(() => 
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
          searchColumn="title"
          searchPlaceholder="Search by title..."
          onFilterChange={setFilters} 
        />

        <Table
          data={filteredData}
          columns={[
            {
              key: "title",
              label: "Title",
              render: (item) => <span>{item.title}</span>,
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
              key: "updatedAt",
              label: "Updated At",
              render: (item) => (
                <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
              ),
            },
            {
              key: "publishedAt",
              label: "Published At",
              render: (item) => (
                <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "N/A"}</span>
              ),
            },
          ]}
          onEdit={(item) => setEditingItem(item)}
        />

        {editingItem && (
          <EditModal<PageData>
            item={editingItem}
            fields={["title"]}
            onSave={handleSave}
            onClose={() => setEditingItem(null)}
          />
        )}
      </div>
    </div>
  );
} 