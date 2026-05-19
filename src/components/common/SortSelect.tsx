import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortSelectProps = {
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

function SortSelect({ sortBy, setSortBy }: SortSelectProps) {
    return (
        <div className="w-full sm:w-[280px]">
            <Select
                value={sortBy || "default"}
                onValueChange={(value) => setSortBy(value === "default" ? "" : value)}>
                {/* Trigger Button */}
                <SelectTrigger
                    className="h-11 w-full rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring transition-all duration-200 cursor-pointer">
                    <SelectValue placeholder="Default Sorting" />
                </SelectTrigger>

                {/* Dropdown Content */}
                <SelectContent
                    position="popper"
                    side="bottom"
                    sideOffset={8}
                    align="start"
                    className="rounded-xl border border-border bg-popover text-popover-foreground shadow-xl overflow-hidden z-50">
                    <SelectItem
                        value="default"
                        className="cursor-pointer rounded-lg"
                    >
                        Default Sorting
                    </SelectItem>

                    <SelectItem
                        value="salary-low-high"
                        className="cursor-pointer rounded-lg"
                    >
                        Salary: Low to High
                    </SelectItem>

                    <SelectItem
                        value="salary-high-low"
                        className="cursor-pointer rounded-lg"
                    >
                        Salary: High to Low
                    </SelectItem>

                    <SelectItem
                        value="name-asc"
                        className="cursor-pointer rounded-lg"
                    >
                        Name: A to Z
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default SortSelect;