import { Pencil, Trash2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";
import React from "react";

type EmployeeCardProps = {
    employee: Employee;
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
    onClick: (employee: Employee) => void;
};

function EmployeeCard({ employee, onEdit, onDelete, onClick }: EmployeeCardProps) {
    const isActive = employee.status === "Active";

    return (
        <div onClick={() => onClick(employee)} className="cursor-pointer rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold">
                    {employee.name}
                </h2>

                <span className={`rounded-full px-3 py-1 text-xs font-medium ${isActive
                    ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                    }`}
                >
                    {employee.status}
                </span>
            </div>

            {/* Details */}
            <div className="mt-4 space-y-2 text-sm">
                <p>
                    <span className="font-medium">
                        Department:
                    </span>{" "}
                    {employee.department}
                </p>

                <p>
                    <span className="font-medium">
                        Salary:
                    </span>{" "}
                    ₹ {employee.salary}
                </p>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
                <Button
                    variant="outline"
                    className="h-10 flex-1 rounded-xl cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(employee);
                    }}
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </Button>

                <Button
                    variant="destructive"
                    className="h-10 flex-1 rounded-xl cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(employee.id);
                    }}
                >
                    <Trash2 className="mr-2 h-4 w-4 " />
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default React.memo(EmployeeCard);