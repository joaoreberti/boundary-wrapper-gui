import { useState } from "react";

export default function Header({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Back End Developer
        </h2>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="search"
          className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="filter by target name"
        />
      </div>
    </div>
  );
}
