// src/components/data-table/DataTable.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "./DataTable";
import type { Column } from "./DataTable";

// Define the type for your table
interface User {
  name: string;
  email: string;
}

describe("DataTable", () => {
  const users: User[] = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
  ];

  const columns: Column<User>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" },
  ];

  test("renders table headers", () => {
    render(<DataTable<User> data={users} columns={columns} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  test("renders table data", () => {
    render(<DataTable<User> data={users} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
  });

  test("shows loading state", () => {
    render(<DataTable<User> data={[]} columns={columns} loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("shows empty state", () => {
    render(<DataTable<User> data={[]} columns={columns} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("sorts data when clicking sortable column", () => {
    render(<DataTable<User> data={users} columns={columns} />);
    const nameHeader = screen.getByText("Name");

    // First click -> ascending
    fireEvent.click(nameHeader);
    const rowsAsc = screen.getAllByRole("row");
    expect(rowsAsc[1]).toHaveTextContent("Alice"); // first row should be Alice

    // Second click -> descending
    fireEvent.click(nameHeader);
    const rowsDesc = screen.getAllByRole("row");
    expect(rowsDesc[1]).toHaveTextContent("Bob"); // first row should be Bob
  });
});
