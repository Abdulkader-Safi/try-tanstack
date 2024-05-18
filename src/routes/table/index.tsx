import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useReducer, useState } from "react";

import countries from "./../../assets/table_test.json";
import { HiArrowDownCircle, HiArrowUpCircle } from "react-icons/hi2";

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
    header: () => <span>Country Name</span>,
  }),
  columnHelper.accessor("country_code", {
    header: () => <span>Country Country Code</span>,
  }),
  columnHelper.accessor("flag", {
    header: () => <span>Country Flag</span>,
    cell: (f) => (
      <div className="h-10">
        <img src={f.getValue()} alt="" className="aspect-video h-full" />
      </div>
    ),
  }),
  columnHelper.accessor("phone_code", {
    header: () => <span>Country Phone Code</span>,
  }),
];

function Index() {
  const [data] = useState<Country[]>(() => [...countries]);
  const rerender = useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="w-screen bg-blue-200 flex flex-col justify-center items-center">
      <table className="w-9/12 p-10">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="w-full flex justify-start items-center gap-5">
                    {header.isPlaceholder ? null : (
                      <div className="w-full flex justify-start items-center gap-5">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {
                          {
                            asc: <HiArrowUpCircle size={24} />,
                            desc: <HiArrowDownCircle size={24} />,
                          }[header.column.getIsSorted() ?? null]
                        }
                      </div>
                    )}
                  </div>{" "}
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

      <div className="w-8/12 flex justify-around items-center">
        <button onClick={() => rerender()} className="border p-2">
          Rerender
        </button>

        <button onClick={() => table.setPageIndex(0)} className="border p-2">
          First Page
        </button>

        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="border p-2"
        >
          Previous Page
        </button>

        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="border p-2"
        >
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
