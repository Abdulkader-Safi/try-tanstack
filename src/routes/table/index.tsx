import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useReducer, useState } from "react";

import countries from "./../../assets/table_test.json";

export const Route = createFileRoute("/table/")({
  component: Index,
});

type Country = {
  name: string;
  flag: string;
  country_code: string;
  phone_code: string;
};

const columnHelper = createColumnHelper<Country>();

const columns = [
  columnHelper.accessor("name", {
    header: () => <span className="w-full">Country Name</span>,
  }),
  columnHelper.accessor("country_code", {
    header: () => <span className="w-full">Country Country Code</span>,
  }),
  columnHelper.accessor("flag", {
    header: () => <span className="w-full">Country Flag</span>,
  }),
  columnHelper.accessor("phone_code", {
    header: () => <span className="w-full">Country Phone Code</span>,
  }),
];

function Index() {
  const [data] = useState<Country[]>(() => [...countries]);
  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-screen bg-blue-200 p-2">
      <table className="w-full p-10">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="h-4" />

      <div className="w-full flex justify-around items-center">
        <button onClick={() => rerender()} className="border p-2">
          Rerender
        </button>

        <button onClick={() => table.setPageIndex(0)} className="border p-2">
          First Page
        </button>

        <button onClick={() => table.previousPage()} className="border p-2">
          Previous Page
        </button>

        <button onClick={() => table.nextPage()} className="border p-2">
          Next Page
        </button>

        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="border p-2"
        >
          Last Page
        </button>
      </div>
    </div>
  );
}
