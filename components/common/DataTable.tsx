'use client';

type Key = string | number;

type RowLike = Record<string, unknown> & { _id?: string; id?: string };

interface DataTableProps {
  columns: {
    header: string;
    accessor: string;
  }[];
  data: RowLike[];
  onRowClick?: (row: RowLike) => void;
}

export default function DataTable({
  columns,
  data,
  onRowClick,
}: DataTableProps) {
  const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

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
          {data.map((row, idx) => {
            const key = (row as any).id ?? (row as any)._id ?? idx;
            return (
              <tr
                key={key}
                onClick={() => onRowClick?.(row)}
                className="hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer"
              >
                {columns.map((col) => {
                  const value = getNestedValue(row, col.accessor);
                  return (
                    <td
                      key={col.accessor}
                      className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {typeof value === 'string' || typeof value === 'number'
                        ? value
                        : value === null || value === undefined
                          ? '-'
                          : JSON.stringify(value)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
