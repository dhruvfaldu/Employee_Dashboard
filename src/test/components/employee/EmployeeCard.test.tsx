import { render,screen } from "@testing-library/react";
import EmployeeCard from "../../../components/employee/EmployeeCard";
import { Employee } from "@/types/employee";

describe("EmployeeCard", () => {
    const mockEmployee: Employee = {
        id: 1,
        name: "John Doe",
        department: "Sales",
        salary: 50000,
        status: "Active",
    };

    it("renders employee details", () => {
        render(<EmployeeCard employee={mockEmployee} onEdit={vi.fn()} onDelete={vi.fn()} onClick={vi.fn()} />);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Sales")).toBeInTheDocument();
        expect(screen.getByText("Active")).toBeInTheDocument();
    });

    test("Renders department and salary correctly", () => {
        render(<EmployeeCard employee={mockEmployee} onEdit={vi.fn()} onDelete={vi.fn()} onClick={vi.fn()} />);
        expect(screen.getByText(/Department:/)).toBeInTheDocument();
        expect(screen.getByText(/Salary:/)).toBeInTheDocument();
        expect(screen.getByText("Sales")).toBeInTheDocument();
        expect(screen.getByText("₹ 50000")).toBeInTheDocument();
    });

     test("Renders status with correct styling", () => {
        render(<EmployeeCard employee={mockEmployee} onEdit={vi.fn()} onDelete={vi.fn()} onClick={vi.fn()} />);
        const statusElement = screen.getByText("Active");
        expect(statusElement).toBeInTheDocument();
        expect(statusElement).toHaveClass("bg-green-100");
    });

    test("render edits and delete buttons", () => {
        render(<EmployeeCard employee={mockEmployee} onEdit={vi.fn()} onDelete={vi.fn()} onClick={vi.fn()} />);
        expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    });

    test("calls onClick,onEdit and onDelete when card is clicked", () => {
        const onClick = vi.fn();
        const onEdit = vi.fn();
        const onDelete = vi.fn();
        render(<EmployeeCard employee={mockEmployee} onEdit={onEdit} onDelete={onDelete} onClick={onClick} />);
        const cardElement = screen.getByText("John Doe").closest("div");
        cardElement && cardElement.click();
        expect(onClick).toHaveBeenCalledWith(mockEmployee);
        const editButton = screen.getByRole("button", { name: /edit/i });
        editButton.click();
        expect(onEdit).toHaveBeenCalledWith(mockEmployee);
        const deleteButton = screen.getByRole("button", { name: /delete/i });
        deleteButton.click();
        expect(onDelete).toHaveBeenCalledWith(mockEmployee.id);

    });
});