import { useState, useMemo, useEffect, useCallback } from "react";
import AddEmployeeModal from "../components/employee/AddEmployeeModal";
import EmployeeList from "../components/employee/EmployeeList";
import { useEmployeeStore } from "../store/employeeStore";
import SearchBar from "../components/common/SearchBar";
import useDebounce from "../hooks/useDebounce";
import Filters from "../components/common/Filters";
import SortSelect from "../components/common/SortSelect";
import { Employee } from "@/types/employee";
import EmployeeDetailsModal from "@/components/employee/EmployeeDetailsModal";
import EditEmployeeModal from "@/components/employee/EditEmployeeModal";
import Pagination from "../components/common/Pagination";
import ThemeToggle from "../components/common/ThemeToggle";
import { Users, Filter, UserCheck, UserX } from "lucide-react";
import logo from "../assets/logo.png";
// import Login from "../pages/Login";
function Dashboard() {

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const employees = useEmployeeStore((state) => state.employees);
    const deleteEmployee = useEmployeeStore((state) => state.deleteEmployee);

    const debouncedSearch = useDebounce(search, 500);

    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
            const matchesSearch = employee.name.toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchesDepartment = department === "" || employee.department === department;
            const matchesStatus = status === "" || employee.status === status;
            return (matchesSearch && matchesDepartment && matchesStatus);
        })
    }, [employees, debouncedSearch, department, status]);

    const sortedEmployees = useMemo(() => {
        return [...filteredEmployees,].sort((a, b) => {
            if (sortBy === "salary-low-high") {
                return a.salary - b.salary;
            }

            if (sortBy === "salary-high-low") {
                return b.salary - a.salary;
            }

            if (sortBy === "name-asc") {
                return a.name.localeCompare(b.name);
            }

            return 0;
        })
    }, [filteredEmployees, sortBy]);

    const employeesPerPage = 6;

    const lastEmployeeIndex = currentPage * employeesPerPage;

    const firstEmployeeIndex = lastEmployeeIndex - employeesPerPage;

    const currentEmployees = sortedEmployees.slice(firstEmployeeIndex, lastEmployeeIndex);

    const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);


    const handleEmployeeClick = useCallback((employee: Employee) => {
        setSelectedEmployee(employee);
        setOpenDetailsModal(true);
    }, []);

    const handleDeleteEmployee = useCallback((id: number) => {
        deleteEmployee(id);
    }, [deleteEmployee]);

    const handleEditEmployee = useCallback((employee: Employee) => {
        setEditingEmployee(employee);
        setOpenEditModal(true);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, department, status, sortBy]);

    return (
        <div className="min-h-screen bg-background text-foreground p-5 space-y-5 transition-colors">
             {/* Add this line to render the Login component */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Employee Management System Logo" className="h-8 w-8" />
                    <h1 className="text-2xl font-bold">Employee Management System</h1>
                </div>
                <SearchBar search={search} setSearch={setSearch} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total Employees */}
                <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Total Employees
                            </p>
                            <h2 className="mt-1 text-3xl font-bold">
                                {employees.length}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-primary/10 p-3 text-primary">
                            <Users className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Filter Results */}
                <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Filter Results
                            </p>
                            <h2 className="mt-1 text-3xl font-bold">
                                {filteredEmployees.length}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
                            <Filter className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Active Employees */}
                <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Active Employees
                            </p>
                            <h2 className="mt-1 text-3xl font-bold">
                                {employees.filter((employee) => employee.status === "Active").length}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-green-500/10 p-3 text-green-600 dark:text-green-400">
                            <UserCheck className="h-5 w-5" />
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Active Employees
                            </p>
                            <h2 className="mt-1 text-3xl font-bold">
                                {employees.filter((employee) => employee.status === "Inactive").length}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-red-500/10 p-3 text-red-600 dark:text-red-400">
                            <UserX className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row-reverse  justify-between items-center">
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <AddEmployeeModal />
                </div>
                <div className="flex flex-col sm:flex-col lg:flex-row gap-4">
                    <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
                    <Filters department={department} setDepartment={setDepartment} status={status} setStatus={setStatus} />
                </div>
            </div>

            <EmployeeList
                employees={currentEmployees}
                onEmployeeClick={handleEmployeeClick}
                onDeleteEmployee={handleDeleteEmployee}
                onEditEmployee={handleEditEmployee}
            />

            <EmployeeDetailsModal employee={selectedEmployee} open={openDetailsModal} onOpenChange={setOpenDetailsModal} />

            <EditEmployeeModal
                employee={editingEmployee}
                open={openEditModal}
                onOpenChange={setOpenEditModal}
            />

            {totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />)}
        </div>
    );
}

export default Dashboard;