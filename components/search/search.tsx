"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeSpecialCharacters } from "@/lib/utils";
import { Button } from "../ui/button";

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (removeSpecialCharacters(query)) {
      router.push(`/search/${removeSpecialCharacters(query)}`);
    }
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full min-w-40">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Otsi filmi..."
        className="border rounded p-2 w-full"
      />

      <Button type="submit" className="ml-2 p-2 w-2/12 min-w-fit">
        Otsi
      </Button>
    </form>
  );
};

export default SearchComponent;
