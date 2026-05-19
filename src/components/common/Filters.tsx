import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

type FiltersProps = {
    department: string;
    setDepartment: React.Dispatch<React.SetStateAction<string>>;

    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
};

function Filters({ department, setDepartment, status, setStatus, }: FiltersProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            {/* Department Filter */}
            <div className="w-full sm:w-[220px]">
                <Select
                    value={department || "all"}
                    onValueChange={(value) => setDepartment(value === "all" ? "" : value)
                    }
                >
                    <SelectTrigger className="h-11 w-full rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring transition-all duration-200 cursor-pointer">
                        <SelectValue placeholder="All Departments" />
                    </SelectTrigger>

                    <SelectContent
                        position="popper"
                        side="bottom"
                        sideOffset={8}
                        align="start"
                        className="rounded-xl border border-border bg-popover text-popover-foreground shadow-xl overflow-hidden z-50">
                        <SelectItem
                            value="all"
                            className="cursor-pointer rounded-lg"
                        >
                            All Departments
                        </SelectItem>

                        <SelectItem
                            value="IT"
                            className="cursor-pointer rounded-lg"
                        >
                            IT
                        </SelectItem>

                        <SelectItem
                            value="CS&IT"
                            className="cursor-pointer rounded-lg"
                        >
                            CS&IT
                        </SelectItem>

                        <SelectItem
                            value="HR"
                            className="cursor-pointer rounded-lg"
                        >
                            HR
                        </SelectItem>

                        <SelectItem
                            value="TL"
                            className="cursor-pointer rounded-lg"
                        >
                            TL
                        </SelectItem>

                        <SelectItem
                            value="CE"
                            className="cursor-pointer rounded-lg"
                        >
                            CE
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Status Filter */}
            <div className="w-full sm:w-[220px]">
                <Select
                    value={status || "all"}
                    onValueChange={(value) => setStatus(value === "all" ? "" : value)}
                >
                    <SelectTrigger
                        className="h-11 w-full rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring transition-all duration-200 cursor-pointer">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>

                    <SelectContent
                        position="popper"
                        side="bottom"
                        sideOffset={8}
                        align="start"
                        className="rounded-xl border border-border bg-popover text-popover-foreground shadow-xl overflow-hidden z-50 ">
                        <SelectItem
                            value="all"
                            className="cursor-pointer rounded-lg"
                        >
                            All Status
                        </SelectItem>

                        <SelectItem
                            value="Active"
                            className="cursor-pointer rounded-lg"
                        >
                            Active
                        </SelectItem>

                        <SelectItem
                            value="Inactive"
                            className="cursor-pointer rounded-lg"
                        >
                            Inactive
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default Filters;