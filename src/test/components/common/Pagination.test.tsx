import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "@/components/common/Pagination";

describe("Pagination Component", () => {
    test("does not render when totalPages is 1", () => {
        const { container } = render(
            <Pagination
                currentPage={1}
                totalPages={1}
                setCurrentPage={vi.fn()}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    test("renders pagination when totalPages is greater than 1", () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={5}
                setCurrentPage={vi.fn()}
            />
        );

        expect(screen.getByText("Previous")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
        // expect(screen.getByText("Page")).toBeInTheDocument();
        // expect(screen.getByText("of")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        // expect(screen.getByText(/Page\s*1\s*of\s*5/i)).toBeInTheDocument();
    });

    test("shows current page number", () => {
        render(
            <Pagination
                currentPage={3}
                totalPages={5}
                setCurrentPage={vi.fn()}
            />
        );

        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();

    });

    test("disables Previous button on first page", () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={5}
                setCurrentPage={vi.fn()}
            />
        );

        const previousButton = screen.getByRole("button", {
            name: /previous/i,
        });

        expect(previousButton).toBeDisabled();
    });

    test("disables Next button on last page", () => {
        render(
            <Pagination
                currentPage={5}
                totalPages={5}
                setCurrentPage={vi.fn()}
            />
        );

        const nextButton = screen.getByRole("button", {
            name: /next/i,
        });

        expect(nextButton).toBeDisabled();
    });

    test("calls setCurrentPage when Next button is clicked", async () => {
        const user = userEvent.setup();
        const mockSetCurrentPage = vi.fn();

        render(
            <Pagination
                currentPage={2}
                totalPages={5}
                setCurrentPage={mockSetCurrentPage}
            />
        );

        const nextButton = screen.getByRole("button", {
            name: /next/i,
        });

        await user.click(nextButton);

        expect(mockSetCurrentPage).toHaveBeenCalledTimes(1);
    });

    test("calls setCurrentPage when Previous button is clicked", async () => {
        const user = userEvent.setup();
        const mockSetCurrentPage = vi.fn();

        render(
            <Pagination
                currentPage={3}
                totalPages={5}
                setCurrentPage={mockSetCurrentPage}
            />
        );

        const previousButton = screen.getByRole("button", {
            name: /previous/i,
        });

        await user.click(previousButton);

        expect(mockSetCurrentPage).toHaveBeenCalledTimes(1);
    });
});