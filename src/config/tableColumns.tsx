import type { TableColumn, PageData, Product, PricePlan } from '../types';
import { columnRenderers } from './columnRenderers';

export const pagesTableConfig = {
  columns: (styles: any): TableColumn<PageData>[] => [
    {
      key: "title",
      label: "Title",
      render: (item) => columnRenderers.text(item.title),
    },
    {
      key: "active",
      label: "Active",
      render: (item) => columnRenderers.activeStatus(item.active, styles),
    },
    {
      key: "updatedAt",
      label: "Updated At",
      render: (item) => columnRenderers.requiredDate(item.updatedAt),
    },
    {
      key: "publishedAt",
      label: "Published At",
      render: (item) => columnRenderers.date(item.publishedAt),
    },
  ],
  editableFields: ["title"] as (keyof PageData)[],
  searchColumn: "title",
  searchPlaceholder: "Search by title..."
};

export const productsTableConfig = {
  columns: (styles: any): TableColumn<Product>[] => [
    {
      key: "name",
      label: "Name",
      render: (item) => columnRenderers.text(item.name),
    },
    {
      key: "size",
      label: "Size",
      render: (item) => columnRenderers.text(item.options.size),
    },
    {
      key: "amount",
      label: "Amount",
      render: (item) => columnRenderers.number(item.options.amount),
    },
    {
      key: "active",
      label: "Active",
      render: (item) => columnRenderers.activeStatus(item.active, styles),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (item) => columnRenderers.requiredDate(item.createdAt),
    },
  ],
  editableFields: ["name"] as (keyof Product)[],
  searchColumn: "name",
  searchPlaceholder: "Search by name..."
};

export const pricePlansTableConfig = {
  columns: (styles: any): TableColumn<PricePlan>[] => [
    {
      key: "description",
      label: "Description",
      render: (item) => columnRenderers.text(item.description),
    },
    {
      key: "active",
      label: "Active",
      render: (item) => columnRenderers.activeStatus(item.active, styles),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (item) => columnRenderers.requiredDate(item.createdAt),
    },
    {
      key: "removedAt",
      label: "Removed At",
      render: (item) => columnRenderers.date(item.removedAt),
    },
  ],
  editableFields: ["description"] as (keyof PricePlan)[],
  searchColumn: "description",
  searchPlaceholder: "Search by description..."
}; 