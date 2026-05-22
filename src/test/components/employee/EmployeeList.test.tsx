import { fireEvent, render, screen } from "@testing-library/react";
import EmployeeList from "../../../components/employee/EmployeeList";
import { Employee } from "@/types/employee";

vi.mock("@/components/employee/EmployeeCard", () => ({
    default: ({ employee, onClick }: any) => (
        <div data-testid="employee-card" onClick={() => onClick(employee)}>
            {employee.name}
        </div>
    ),
}));

describe("EmployeeList", () => {
    const mockEmployees: Employee[] = [
        {
            id: 1,
            name: "John Doe",
            department: "Sales",
            salary: 50000,
            status: "Active",
        },
        {
            id: 2,
            name: "Jane Smith",
            department: "IT",
            salary: 60000,
            status: "Inactive",
        },
    ];

    it("renders employee cards when employees are provided", () => {
        render(<EmployeeList employees={mockEmployees} onEmployeeClick={vi.fn()} onDeleteEmployee={vi.fn()} onEditEmployee={vi.fn()} />);
        expect(screen.getAllByTestId("employee-card")).toHaveLength(2);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    test("renders no employees message when employee list is empty", () => {
        render(<EmployeeList employees={[]} onEmployeeClick={vi.fn()} onDeleteEmployee={vi.fn()} onEditEmployee={vi.fn()} />);
        expect(screen.getByText("No employees found")).toBeInTheDocument();
    });

    test("calls onEmployeeClick when an employee card is clicked", () => {
        const onEmployeeClick = vi.fn();
        render(<EmployeeList employees={mockEmployees} onEmployeeClick={onEmployeeClick} onDeleteEmployee={vi.fn()} onEditEmployee={vi.fn()} />);
        const employeeCard = screen.getByText("John Doe").closest("div[data-testid='employee-card']");
        fireEvent.click(employeeCard!);
        expect(onEmployeeClick).toHaveBeenCalledWith(mockEmployees[0]);
    });

   
});
