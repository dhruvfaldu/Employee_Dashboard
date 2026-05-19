// components/SearchBar.tsx

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type SearchBarProps = {
    // Preferred (used by tests)
    searchTerm?: string;
    onSearchChange?: (value: string) => void;

    // Backward-compatible (used by existing app code)
    search?: string;
    setSearch?: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ searchTerm, onSearchChange, search, setSearch, }: SearchBarProps) {
    const value = searchTerm ?? search ?? "";
    return (
        <div className="relative w-1/3 sm:w-1/3">
            {/* Search Icon */}
            <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />

            {/* Input Field */}
            <Input
                type="text"
                placeholder="Search employees..."
                value={value}
                onChange={(e) => {
                    const next = e.target.value;

                    // Test-friendly prop first
                    if (onSearchChange) onSearchChange(next);
                    // Fallback to previous app wiring
                    else if (setSearch) setSearch(next);
                }}
                className="h-11 w-full rounded-xl border-border bg-card text-card-foreground pl-10 pr-4 shadow-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring " />
        </div>
    );
}

export default SearchBar;
