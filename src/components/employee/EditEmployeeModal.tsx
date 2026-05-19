import { Employee } from "@/types/employee";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import AddEmployeeForm from "./AddEmployeeForm";

type EditEmployeeModalProps = {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function EditEmployeeModal({ employee, open, onOpenChange }: EditEmployeeModalProps) {
  if (!employee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl border-border bg-card p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Employee
          </DialogTitle>
        </DialogHeader>

        <AddEmployeeForm key={employee.id} employeeToEdit={employee} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default EditEmployeeModal;