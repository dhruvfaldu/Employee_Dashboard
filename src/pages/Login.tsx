// Login.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useEmployeeStore } from "../store/employeeStore";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type LoginFormData = {
    email: string;
    password: string;
};

type LoginErrors = {
    email?: string;
    password?: string;
    general?: string;
};

type TouchedFields = {
    email?: boolean;
    password?: boolean;
};

const Login = () => {
    const navigate = useNavigate();

    const login = useEmployeeStore((state) => state.login);

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<LoginErrors>({});

    const [touched, setTouched] = useState<TouchedFields>({});

    // ================= VALIDATION =================

    const validateField = (
        name: keyof LoginFormData,
        value: string
    ): string => {
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

        const fieldName = name as keyof LoginFormData;

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

        const fieldName = name as keyof LoginFormData;

        setTouched((prev) => ({
            ...prev,
            [fieldName]: true,
        }));

        setErrors((prev) => ({
            ...prev,
            [fieldName]: validateField(fieldName, value),
        }));
    };

    // ================= HANDLE LOGIN =================

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailError = validateField("email", formData.email);
        const passwordError = validateField(
            "password",
            formData.password
        );

        setErrors({
            email: emailError,
            password: passwordError,
        });

        setTouched({
            email: true,
            password: true,
        });

        if (emailError || passwordError) {
            return;
        }

        const success = login(formData.email, formData.password);

        if (success) {
            navigate("/dashboard");
        } else {
            setErrors({
                general: "Invalid email or password",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4">
            <Card className="w-full max-w-md rounded-3xl shadow-xl">
                <CardContent className="p-8">
                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">
                            Welcome Back 👋
                        </h1>

                        <p className="text-sm text-slate-500 mt-2">
                            Login to your account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
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

                        {/* General Error */}
                        {errors.general && (
                            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-xl">
                                {errors.general}
                            </div>
                        )}

                        {/* Button */}
                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl"
                        >
                            Login
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-500">
                            Don&apos;t have an account?
                        </p>

                        <Link
                            to="/signup"
                            className="text-blue-600 text-sm font-semibold"
                        >
                            Create Account
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;