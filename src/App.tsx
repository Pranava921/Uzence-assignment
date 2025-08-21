import { useState } from "react";
import { InputField } from "./components/input-field/InputField";
import { DataTable } from "./components/data-table/DataTable";
import type { Column } from "./components/data-table/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const sampleData: User[] = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 28 },
];

function App() {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const columns: Column<User>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  const filteredData = sampleData.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Table</h1>
      <div className="w-full max-w-lg mb-8">
      <InputField
        label="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type a name..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      </div>

      <div className="w-full max-w-3xl overflow-x-auto bg-white rounded-2xl overflow-hidden shadow-lg p-6">
      <DataTable<User>
        data={filteredData}
        columns={columns}
        selectable
        onRowSelect={setSelectedUsers}
      />
      </div>

      {selectedUsers.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm text-blue-700 font-medium">
          ✅ Selected Users:{" "}
          <span className="font-semibold">
            {selectedUsers.map((u) => u.name).join(", ")}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;

