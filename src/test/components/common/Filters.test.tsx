// src/test/components/common/Filters.test.tsx

import { render, screen } from "@testing-library/react";
import Filters from "@/components/common/Filters";

describe("Filters Component", () => {
  test("renders department and status dropdowns", () => {
    render(
      <Filters
        department=""
        setDepartment={vi.fn()}
        status=""
        setStatus={vi.fn()}
      />
    );

    // Radix Select renders trigger buttons
    const dropdowns = screen.getAllByRole("combobox");

    expect(dropdowns).toHaveLength(2);
  });

  test("shows selected department value", () => {
    render(
      <Filters
        department="IT"
        setDepartment={vi.fn()}
        status=""
        setStatus={vi.fn()}
      />
    );

    expect(screen.getByText("IT")).toBeInTheDocument();
  });

  test("shows selected status value", () => {
    render(
      <Filters
        department=""
        setDepartment={vi.fn()}
        status="Active"
        setStatus={vi.fn()}
      />
    );

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("shows default text when no department is selected", () => {
    render(
      <Filters
        department=""
        setDepartment={vi.fn()}
        status=""
        setStatus={vi.fn()}
      />
    );

    expect(screen.getByText("All Departments")).toBeInTheDocument();
  });

  test("shows default text when no status is selected", () => {
    render(
      <Filters
        department=""
        setDepartment={vi.fn()}
        status=""
        setStatus={vi.fn()}
      />
    );

    expect(screen.getByText("All Status")).toBeInTheDocument();
  });
});