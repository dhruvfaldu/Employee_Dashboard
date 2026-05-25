import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Employee } from "../types/employee";

interface EmployeeState {
  employees: Employee[];
}

interface EmployeeActions {
  addEmployee: (employee: Employee) => void;
  deleteEmployee: (id: number) => void;
  updateEmployee: (updatedEmployee: Employee) => void;
}

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthState = {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;

  signup: (user: User) => void;

  login: (email: string, password: string) => boolean;

  logout: () => void;
};

type EmployeeStore = EmployeeState & EmployeeActions & AuthState;

export const useEmployeeStore = create<EmployeeStore>()(
  persist((set) => ({
    employees: [],
    users: [],
    currentUser: null,
    isAuthenticated: false,
    addEmployee: (employee) => set((state) => ({
      employees: [...state.employees, employee],
    })),

    deleteEmployee: (id) => set((state) => ({
      employees: state.employees.filter((employee) => employee.id !== id),
    })),

    updateEmployee: (updatedEmployee) => set((state) => ({
      employees: state.employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee),
    })),

    signup: (user) =>
      set((state) => ({
        users: [...state.users, user],
      })),

    login: (email, password) => {
      const state = useEmployeeStore.getState();

      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        set({
          currentUser: user,
          isAuthenticated: true,
        });

        return true;
      }

      return false;
    },

    logout: () =>
      set({
        currentUser: null,
        isAuthenticated: false,
      }),
  }),
    {
      name: "employee-storage",
    }
  )
);