import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddEmployeeForm from "./AddEmployeeForm";

function AddEmployeeModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-11 rounded-xl shadow-sm cursor-pointer">
                    + Add Employee
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg rounded-2xl border-border bg-card p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Add New Employee
                    </DialogTitle>
                </DialogHeader>

                <AddEmployeeForm onSuccess={() => setOpen(false)}/>
            </DialogContent>
        </Dialog>
    );
}

export default AddEmployeeModal;