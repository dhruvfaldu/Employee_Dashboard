export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  status: "Active" | "Inactive";
}