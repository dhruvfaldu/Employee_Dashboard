// Signup.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useEmployeeStore } from "../store/employeeStore";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type SignupFormData = {
    name: string;
    email: string;
    password: string;
};

type SignupErrors = {
    name?: string;
    email?: string;
    password?: string;
};

type TouchedFields = {
    name?: boolean;
    email?: boolean;
    password?: boolean;
};

const Signup = () => {
    const navigate = useNavigate();

    const signup = useEmployeeStore((state) => state.signup);

    const [formData, setFormData] = useState<SignupFormData>({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<SignupErrors>({});

    const [touched, setTouched] = useState<TouchedFields>({});

    // ================= VALIDATION =================

    const validateField = (
        name: keyof SignupFormData,
        value: string
    ): string => {
        if (name === "name") {
            if (!value.trim()) {
                return "Name is required";
            }

            if (value.length < 3) {
                return "Minimum 3 characters";
            }
        }

        if (name === "email") {
            if (!value.trim()) {
                return "Email is required";
            }

            if (!/\S+@\S+\.\S+/.test(value)) {
                return "Invalid email";
            }
        }

        if (name === "password") {
            if (!value.trim()) {
                return "Password is required";
            }

            if (value.length < 6) {
                return "Minimum 6 characters";
            }
        }

        return "";
    };

    // ================= HANDLE CHANGE =================

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const fieldName = name as keyof SignupFormData;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));

        // Live Validation
        if (touched[fieldName]) {
            setErrors((prev) => ({
                ...prev,
                [fieldName]: validateField(fieldName, value),
            }));
        }
    };

    // ================= HANDLE BLUR =================

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const fieldName = name as keyof SignupFormData;

        setTouched((prev) => ({
            ...prev,
            [fieldName]: true,
        }));

        setErrors((prev) => ({
            ...prev,
            [fieldName]: validateField(fieldName, value),
        }));
    };

    // ================= HANDLE SIGNUP =================

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameError = validateField("name", formData.name);
        const emailError = validateField("email", formData.email);
        const passwordError = validateField(
            "password",
            formData.password
        );

        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError,
        });

        setTouched({
            name: true,
            email: true,
            password: true,
        });

        if (nameError || emailError || passwordError) {
            return;
        }

        signup(formData);

        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4">
            <Card className="w-full max-w-md rounded-3xl shadow-xl">
                <CardContent className="p-8">
                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">
                            Create Account 🚀
                        </h1>

                        <p className="text-sm text-slate-500 mt-2">
                            Signup to continue
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="space-y-5">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label>Full Name</Label>

                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`h-11 rounded-xl ${errors.name
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : ""
                                    }`}
                            />

                            {touched.name && errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label>Email</Label>

                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`h-11 rounded-xl ${errors.email
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : ""
                                    }`}
                            />

                            {touched.email && errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label>Password</Label>

                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`h-11 rounded-xl ${errors.password
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : ""
                                    }`}
                            />

                            {touched.password && errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Button */}
                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl"
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-500">
                            Already have an account?
                        </p>

                        <Link
                            to="/login"
                            className="text-blue-600 text-sm font-semibold"
                        >
                            Login Here
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;