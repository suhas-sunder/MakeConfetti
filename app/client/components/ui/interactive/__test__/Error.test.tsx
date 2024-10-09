import { render, screen } from "@testing-library/react";
import MockThemeProvider from "../../../../mocks/components/MockThemeContext";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import Error from "../Error";
import { describe, expect, it } from "vitest";

// Create a mock ThemeProvider to control the darkThemeActive value
const MockError = () => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={true}>
        <Error />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

describe("renders defaults correctly", () => {
  it("should render skull and crossbones emoji with animation class", () => {
    MockError();

    const textElement = screen.getByText(/☠️/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass(/animate-scalePulse/i);
  });

  it("should render main heading with appropriate text", () => {
    MockError();

    const headingElement = screen.getByRole("heading", { name: /Uh Oh, 404/i });
    expect(headingElement).toBeInTheDocument();
  });

  it("should render sub-heading with appropriate text", () => {
    MockError();

    const headingElement = screen.getByRole("heading", {
      name: /Page Not Found.../i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("should render paragraph with appropriate text", () => {
    MockError();

    const paraElement = screen.getByText(/does not exist/i);
    expect(paraElement).toBeInTheDocument();
  });

  it("should render a link that redirects to the home page", () => {
    MockError();

    const linkElement = screen.getByRole("link", { name: /Home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
