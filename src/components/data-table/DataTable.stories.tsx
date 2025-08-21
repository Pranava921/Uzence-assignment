// src/components/data-table/DataTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const data: User[] = [
  { id: 1, name: "Alice", email: "alice@test.com" },
  { id: 2, name: "Bob", email: "bob@test.com" },
];

const columns = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    data,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};
