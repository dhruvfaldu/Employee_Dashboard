import { Employee } from "@/types/employee";
import EmployeeCard from "./EmployeeCard";

type EmployeeListProps = {
    employees: Employee[];
    onEmployeeClick: (employee: Employee) => void;
    onDeleteEmployee: (id: number) => void;
    onEditEmployee: (employee: Employee) => void;
};


function EmployeeList({ employees, onEmployeeClick, onDeleteEmployee, onEditEmployee }: EmployeeListProps) {
    if (employees.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center">
                <h3 className="text-lg font-semibold">
                    No employees found
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Try changing your search or filter criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {employees.map((employee) => (
                <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onClick={onEmployeeClick}
                    onDelete={onDeleteEmployee}
                    onEdit={onEditEmployee}
                />
            ))}
        </div>
    );
}

export default EmployeeList;