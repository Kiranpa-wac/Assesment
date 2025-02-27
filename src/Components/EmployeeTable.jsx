// EmployeeTable.jsx
import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEmployeeData } from "./Hooks/useEmployeeData";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import "./EmployeeTable.css";

// Pagination Component
const TablePagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link d-flex align-items-center gap-1"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft size={18} /> First
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link d-flex align-items-center gap-1"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} /> Prev
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link d-flex align-items-center gap-1"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight size={18} />
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link d-flex align-items-center gap-1"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last <ChevronsRight size={18} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

const EmployeeTable = () => {
  // Read the page number from the URL (defaulting to 1 if not present)
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  // Pass the page from the URL into the hook
  const { data, totalPages, isLoading } = useEmployeeData({ page: pageParam });

  // When the page changes, update the URL query parameter.
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  const columns = useMemo(
    () => [
      { header: "Employee Id", accessorKey: "employee_code" },
      { header: "Name", accessorKey: "name" },
      { header: "Email", accessorKey: "email" },
      { header: "Mobile", accessorKey: "phone" },
      {
        header: "Designation",
        accessorFn: (row) => row.designation.title,
        id: "designation",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Link className="button-link" to={`/detail/${row.original.id}`}>
            View Details
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: pageParam - 1,
        pageSize: 10,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex: pageParam - 1 })
          : updater;
      // Update URL with the new page (remember to add 1 since pageIndex is zero-based)
      setSearchParams({ page: (newState.pageIndex + 1).toString() });
    },
  });

  return (
    <div className="table-container" style={{ minHeight: "400px" }}>
      {isLoading && (
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ zIndex: 10 }}
        >
          <div className="btm primary">Loading...</div>
        </div>
      )}

      <div className={isLoading ? "blur" : ""}>
        <table className="employee-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        currentPage={pageParam}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EmployeeTable;
