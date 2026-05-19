import { Employee } from "@/types/employee";
import { BadgeInfo, Building2, CircleDollarSign, Hash, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type EmployeeDetailsModalProps = {
    employee: Employee | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

function EmployeeDetailsModal({ employee, open, onOpenChange, }: EmployeeDetailsModalProps) {
    if (!employee) return null;

    const isActive = employee.status === "Active";

    const details = [
        {
            icon: Hash,
            label: "Employee ID",
            value: employee.id,
        },
        {
            icon: User,
            label: "Name",
            value: employee.name,
        },
        {
            icon: Building2,
            label: "Department",
            value: employee.department,
        },
        {
            icon: CircleDollarSign,
            label: "Salary",
            value: `₹ ${employee.salary.toLocaleString(
                "en-IN"
            )}`,
        },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md rounded-2xl border-border bg-card p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
                        <BadgeInfo className="h-5 w-5" />
                        Employee Details
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                    {details.map(
                        ({
                            icon: Icon,
                            label,
                            value,
                        }) => (
                            <div
                                key={label}
                                className="flex items-center justify-between rounded-xl bg-muted p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                        {label}
                                    </span>
                                </div>

                                <span className="font-medium text-foreground">
                                    {value}
                                </span>
                            </div>
                        )
                    )}

                    {/* Status */}
                    <div className="flex items-center justify-between rounded-xl bg-muted p-3">
                        <span className="text-sm text-muted-foreground">
                            Status
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${isActive
                                ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                                : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                                }`}
                        >
                            {employee.status}
                        </span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EmployeeDetailsModal;