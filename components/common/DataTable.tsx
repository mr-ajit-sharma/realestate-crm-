'use client';

interface DataTableProps {
  columns: {
    header: string;
    accessor: string;
  }[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function DataTable({
  columns,
  data,
  onRowClick,
}: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className="hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer"
            >
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"
                >
                  {row[col.accessor] ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
