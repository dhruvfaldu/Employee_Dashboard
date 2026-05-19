import { render, screen } from "@testing-library/react";
import SortSelect from "@/components/common/SortSelect";

describe("SortSelect Component", () => {
  test("renders sort options", () => {
    render(<SortSelect sortBy="" setSortBy={vi.fn()} />);

    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
  });

//   test("shows selected sort option", () => {
//     render(<SortSelect sortBy="Salary: Low to High" setSortBy={vi.fn()} />);

//     expect(screen.getByText("Salary: Low to High")).toBeInTheDocument();
//   });

  test("shows default text when no sort option is selected", () => {
    render(<SortSelect sortBy="" setSortBy={vi.fn()} />);

    expect(screen.getByText("Default Sorting")).toBeInTheDocument();
  });
});