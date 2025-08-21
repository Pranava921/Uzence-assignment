// src/components/data-table/DataTable.tsx
import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export const DataTable = <T extends { [key: string]: any }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleRowSelect = (row: T) => {
    let newSelectedRows: T[] = [];
    if (selectedRows.includes(row)) {
      newSelectedRows = selectedRows.filter((r) => r !== row);
    } else {
      newSelectedRows = [...selectedRows, row];
    }
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (data.length === 0) return <p className="text-center p-4">No data available</p>;

  return (
    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
      <thead  className="bg-gray-100 text-left">
        <tr>
          {selectable && <th className="p-3"></th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className="p-3 text-sm font-semibold text-gray-700 border-b border-gray-200"
              onClick={() => col.sortable && handleSort(col.dataIndex)}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr
            key={idx}
            className={selectedRows.includes(row) ? "bg-blue-100" : ""}
            onClick={() => selectable && handleRowSelect(row)}
          >
            {selectable && (
              <td className="p-3 border-b border-gray-200">
                <input type="checkbox" checked={selectedRows.includes(row)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"

                readOnly />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="p-3 text-sm text-gray-700 border-b border-gray-200">{row[col.dataIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
