import { screen, fireEvent, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../NavBar";
import MockThemeProvider from "../../../mocks/components/MockThemeContext";
import "@testing-library/jest-dom/vitest";

const MockNavBar = ({ darkThemeActive }: { darkThemeActive?: boolean }) => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={darkThemeActive}>
        <NavBar />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

describe("NavBar renders defaults", () => {
  it("should render a navigation element", () => {
    MockNavBar({ darkThemeActive: false });
    const navElement = screen.getByRole("navigation");

    expect(navElement).toBeInTheDocument();
  });

  it("should render blog link", () => {
    MockNavBar({ darkThemeActive: false });
    const linkElement = screen.getByRole("link", { name: /blog/i });

    expect(linkElement).toBeInTheDocument();
  });

  it("should render label with burger icons", () => {
    MockNavBar({ darkThemeActive: false });
    const labelElement = screen.getByTestId("burger-icons");
    expect(labelElement).toBeInTheDocument();
  });

  it("should render only one button for dark/light theme", () => {
    MockNavBar({ darkThemeActive: false });
    const menuButtonElements = screen.getByRole("button");

    expect(menuButtonElements).toBeInTheDocument();
  });

  it("should render two buttons when label element is clicked, one for mobile nav and the other for dark/light theme", () => {
    MockNavBar({ darkThemeActive: false });
    const labelElement = screen.getByTestId("burger-icons");

    // Click on the burger icon to open the mobile menu
    fireEvent.click(labelElement);

    const menuButtonElements = screen.getAllByRole("button");

    //Menu open button icon
    expect(menuButtonElements[0]).toBeInTheDocument();

    //Menu open button icon
    expect(menuButtonElements[1]).toBeInTheDocument();
  });
});
