import {render, screen} from '@testing-library/react';
import EmployeeDetailsModal from "../../../components/employee/EmployeeDetailsModal";
import { Employee } from "@/types/employee";
describe("EmployeeDetailsModal", () => {
    const mockEmployee: Employee = {
        id: 1,
        name: "John Doe",
        department: "Sales",
        salary: 50000,
        status: "Active",
    };

    it("renders employee details when open", () => {
        render(<EmployeeDetailsModal employee={mockEmployee} open={true} onOpenChange={vi.fn()} />);
        expect(screen.getByText("Employee Details")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Sales")).toBeInTheDocument();
        expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("does not render employee details when not open", () => {
        render(<EmployeeDetailsModal employee={mockEmployee} open={false} onOpenChange={vi.fn()} />);
        expect(screen.queryByText("Employee Details")).toBeNull();
        expect(screen.queryByText("John Doe")).toBeNull();
        expect(screen.queryByText("Sales")).toBeNull();
        expect(screen.queryByText("Active")).toBeNull();
    });

    it("does not render when employee is null", () => {
        render(<EmployeeDetailsModal employee={null} open={true} onOpenChange={vi.fn()} />);
        expect(screen.queryByText("Employee Details")).toBeNull();
    });

    it("renders salary in correct format",()=>{
        render(<EmployeeDetailsModal employee={mockEmployee} open={true} onOpenChange={vi.fn()}/>);
        expect(screen.getByText("₹ 50,000")).toBeInTheDocument();
    })
});