import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import Paginate from "../Paginate";

describe("handles pagination correctly", () => {
  const mockSetPaginatedItems = vi.fn();

  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
  ];

  it("should render the pagination component correctly", () => {
    render(
      <Paginate
        items={items}
        paginatedItems={[]}
        setPaginatedItems={mockSetPaginatedItems}
        itemsPerPage={2}
      />
    );

    expect(screen.getByText("Next >")).toBeInTheDocument();
    expect(screen.getByText("< Prev")).toBeInTheDocument();
  });

  it("should call setPaginatedItems on page change", () => {
    render(
      <Paginate
        items={items}
        paginatedItems={[]}
        setPaginatedItems={mockSetPaginatedItems}
        itemsPerPage={2}
      />
    );

    const nextButton = screen.getByText("Next >");

    fireEvent.click(nextButton);

    expect(mockSetPaginatedItems).toHaveBeenCalledWith([
      { id: 3, name: "Item 3" },
      { id: 4, name: "Item 4" },
    ]);
  });

  it("should render the correct number of pages", () => {
    render(
      <Paginate
        items={items}
        paginatedItems={[]}
        setPaginatedItems={mockSetPaginatedItems}
        itemsPerPage={2}
      />
    );

    expect(screen.getAllByRole("button").length).toBe(5);
  });
});
