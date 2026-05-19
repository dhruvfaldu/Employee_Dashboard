import { useState } from "react";
import { Employee } from "@/types/employee";
import { useEmployeeStore } from "../../store/employeeStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Status = "Active" | "Inactive";

type Errors = {
    name: string;
    department: string;
    salary: string;
};

type Touched = {
    name: boolean;
    department: boolean;
    salary: boolean;
};

type AddEmployeeFormProps = {
    employeeToEdit?: Employee;
    onSuccess?: () => void;
};

const initialErrors: Errors = {
    name: "",
    department: "",
    salary: "",
};

const initialTouched: Touched = {
    name: false,
    department: false,
    salary: false,
};

function AddEmployeeForm({ employeeToEdit, onSuccess }: AddEmployeeFormProps) {
    const addEmployee = useEmployeeStore((s) => s.addEmployee);
    const updateEmployee = useEmployeeStore((s) => s.updateEmployee);

    const [name, setName] = useState(employeeToEdit?.name || "");
    const [department, setDepartment] = useState(employeeToEdit?.department || "");
    const [salary, setSalary] = useState(employeeToEdit ? String(employeeToEdit.salary) : "");
    const [status, setStatus] = useState<Status>(employeeToEdit?.status || "Active");

    const [errors, setErrors] = useState(initialErrors);
    const [touched, setTouched] = useState(initialTouched);

    const inputClass = "h-11 rounded-xl border-border bg-card text-card-foreground cursor-pointer";

    const validate = () => {
        const newErrors: Errors = { ...initialErrors };

        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.trim().length < 3) {
            newErrors.name = "Minimum 3 characters required";
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
            newErrors.name = "Only alphabets allowed";
        }

        if (!department.trim()) {
            newErrors.department = "Department is required";
        } else if (department.trim().length < 2) {
            newErrors.department = "Minimum 2 characters required";
        }

        if (!salary.trim()) {
            newErrors.salary = "Salary is required";
        } else if (isNaN(Number(salary))) {
            newErrors.salary = "Salary must be numeric";
        } else if (Number(salary) <= 0) {
            newErrors.salary = "Salary must be greater than 0";
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((e) => !e);
    };

    const handleBlur = (field: keyof Touched) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validate();
    };

    const handleChange = (field: keyof Touched, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter(value);
        if (touched[field]) validate();
    };

    const resetForm = () => {
        setName("");
        setDepartment("");
        setSalary("");
        setStatus("Active");
        setErrors(initialErrors);
        setTouched(initialTouched);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTouched({ name: true, department: true, salary: true, });

        if (!validate()) return;

        const employeeData = {
            id: employeeToEdit?.id || Date.now(),
            name: name.trim(),
            department: department.trim(),
            salary: Number(salary),
            status,
        };

        if (employeeToEdit) {
            updateEmployee(employeeData);
        } else {
            addEmployee(employeeData);
        }

        resetForm();
        onSuccess?.();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={name}
                    placeholder="Enter employee name"
                    onChange={(e) => handleChange("name", e.target.value, setName)}
                    onBlur={() => handleBlur("name")}
                    className={inputClass}
                />
                {touched.name && errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                )}
            </div>

            {/* Department */}
            <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                    id="department"
                    value={department}
                    placeholder="Enter department"
                    onChange={(e) =>
                        handleChange(
                            "department",
                            e.target.value,
                            setDepartment
                        )
                    }
                    onBlur={() => handleBlur("department")}
                    className={inputClass}
                />
                {touched.department && errors.department && (
                    <p className="text-sm text-destructive">
                        {errors.department}
                    </p>
                )}
            </div>

            {/* Salary */}
            <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                    id="salary"
                    type="number"
                    value={salary}
                    placeholder="Enter salary"
                    onChange={(e) =>
                        handleChange(
                            "salary",
                            e.target.value,
                            setSalary
                        )
                    }
                    onBlur={() => handleBlur("salary")}
                    className={inputClass}
                />
                {touched.salary && errors.salary && (
                    <p className="text-sm text-destructive">{errors.salary}</p>
                )}
            </div>

            {/* Status */}
            <div className="space-y-2">
                <Label>Status</Label>
                <Select
                    value={status}
                    onValueChange={(value) =>
                        setStatus(value as Status)
                    }
                >
                    <SelectTrigger className={inputClass}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                        position="popper"
                        side="right"
                        sideOffset={4}
                        className="rounded-xl border-border bg-popover"
                    >
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="h-11 w-full rounded-xl cursor-pointer">
                {employeeToEdit ? "Update Employee" : "Add Employee"}
            </Button>
        </form>
    );
}

export default AddEmployeeForm;