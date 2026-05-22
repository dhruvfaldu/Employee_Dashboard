import { DollarSign, Pencil, Trash2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee";
import React from "react";
import { BadgeInfo, Building2, CircleDollarSign, Hash, User, UserX, UserCheck } from "lucide-react";

type EmployeeCardProps = {
    employee: Employee;
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
    onClick: (employee: Employee) => void;
};


function EmployeeCard({ employee, onEdit, onDelete, onClick }: EmployeeCardProps) {
    const isActive = employee.status === "Active";

    const firstLetter = employee.name.charAt(0).toUpperCase();

    return (
        <>
            <div onClick={() => onClick(employee)} className="cursor-pointer rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary ${isActive ? "ring-2 ring-green-500" : "ring-2 ring-red-500"}`}>
                            {firstLetter}
                        </div>

                        <h2 className="text-sm font-semibold">
                            {employee.name}
                        </h2>
                    </div>

                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                        }`}
                    >
                        {employee.status === "Active" ? (<>
                            <UserCheck className="mr-1 mb-1 inline h-3 w-3" />
                            Active
                        </>) : (
                            <>
                                <UserX className="mr-1 mb-1 inline h-3 w-3" />
                                Inactive
                            </>
                        )}
                    </span>
                </div>

                {/* Details */}
                <div className="mt-4 space-y-2 text-sm">
                    <p>
                        <Building2 className="mr-2 inline h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                            Department:
                        </span>{" "}
                        {employee.department}
                    </p>

                    <p>
                        <CircleDollarSign className="mr-2 inline h-4 w-4 text-muted-foreground" />
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

            
        </>
    );
}

export default React.memo(EmployeeCard);