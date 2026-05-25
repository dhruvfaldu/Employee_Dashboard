import React from "react";

import {
    Pencil,
    Trash2,
    Building2,
    CircleDollarSign,
    UserCheck,
    UserX,
} from "lucide-react";

import { Employee } from "@/types/employee";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

type EmployeeCardProps = {
    employee: Employee;
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
    onClick: (employee: Employee) => void;
};

function EmployeeCard({
    employee,
    onEdit,
    onDelete,
    onClick,
}: EmployeeCardProps) {
    const isActive = employee.status === "Active";

    const firstLetter = employee.name
        .charAt(0)
        .toUpperCase();

    return (
        <Card
            onClick={() => onClick(employee)}
            className="cursor-pointer rounded-3xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <Avatar
                        className={`h-8 w-8 ${isActive
                            ? "ring-2 ring-green-500"
                            : "ring-2 ring-red-500"
                            }`}
                    >
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {firstLetter}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h2 className="text-base font-semibold">
                            {employee.name}
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Employee
                        </p>
                    </div>
                </div>

                {/* Status */}
                <Badge
                    variant={isActive ? "default" : "destructive"}
                    className="rounded-full px-3 py-1 text-xs"
                >
                    {isActive ? (
                        <>
                            <UserCheck className="mr-1 h-3 w-3" />
                            Active
                        </>
                    ) : (
                        <>
                            <UserX className="mr-1 h-3 w-3" />
                            Inactive
                        </>
                    )}
                </Badge>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-4">
                {/* Department */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 text-sm">
                        <div className="rounded-full bg-muted p-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Department
                            </p>

                            <p className="font-medium">
                                {employee.department}
                            </p>
                        </div>
                    </div>

                    {/* Salary */}
                    <div className="flex items-center gap-3 text-sm">
                        <div className="rounded-full bg-muted p-2">
                            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Salary
                            </p>

                            <p className="font-medium">
                                ₹ {employee.salary}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-3">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-xl cursor-pointer"
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
                        className="flex-1 rounded-xl cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(employee.id);
                        }}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default React.memo(EmployeeCard);