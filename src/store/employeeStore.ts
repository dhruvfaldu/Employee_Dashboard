import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Employee } from "../types/employee";

type EmployeeStore = {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  deleteEmployee: (id: number) => void;
  updateEmployee: (updatedEmployee: Employee) => void;
};

export const useEmployeeStore = create<EmployeeStore>()(
  persist((set) => ({
    employees: [],
    addEmployee: (employee) => set((state) => ({
      employees: [...state.employees, employee,],
    })),

    deleteEmployee: (id) => set((state) => ({
      employees: state.employees.filter((employee) => employee.id !== id),
    })),

    updateEmployee: (updatedEmployee) => set((state) => ({
      employees: state.employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee),
    })),
  }),
    {
      name: "employee-storage",
    }
  )
);