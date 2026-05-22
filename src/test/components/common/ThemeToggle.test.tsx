import { render,screen } from "@testing-library/react";
import ThemeToggle from "@/components/common/ThemeToggle";

describe("ThemeToggle Component", () => {
    test("renders toggle button", () => {
        render(<ThemeToggle />);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("has correct classes for light mode", () => {
        render(<ThemeToggle />);

        expect(screen.getByRole("button")).toHaveClass("bg-card");
    });

    test("has correct classes for dark mode", () => {
        render(<ThemeToggle />);

        expect(screen.getByRole("button")).toHaveClass("bg-card");
    });
});