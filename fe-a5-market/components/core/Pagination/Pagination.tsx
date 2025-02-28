"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";

export default function PaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center py-6">
      <Pagination
        currentPage={currentPage}
        totalPages={100}
        onPageChange={onPageChange}
        theme={{
          pages: {
            previous: {
              base: "ml-0 rounded-l-lg border border-black bg-primary px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-stale-700 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
            },
            next: {
              base: "rounded-r-lg border border-black bg-primary px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-stale-700 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
            },
            selector: {
              base: "w-12 border border-black bg-primary py-2 leading-tight text-gray-500 enabled:hover:bg-stale-700 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-slate-700 enabled:dark:hover:text-white",
              active:
                "bg-primary text-cyan-600 hover:bg-stale-700 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
              disabled: "cursor-not-allowed opacity-50",
            },
          },
        }}
      />
    </div>
  );
}
