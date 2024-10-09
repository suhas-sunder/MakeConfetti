import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Logo from "../Logo";

const setShowMobileMenu = vi.fn();

const MockLogo = ({ darkThemeActive }: { darkThemeActive: boolean }) => {
  render(
    <BrowserRouter>
      <Logo
        darkThemeActive={darkThemeActive}
        setShowMobileMenu={setShowMobileMenu}
      />
    </BrowserRouter>
  );
};

describe("Logo component", () => {
  it("should render the logo navigation link", () => {
    MockLogo({ darkThemeActive: false });

    const navLinkElement = screen.getByTestId("logo-naviation-link");
    expect(navLinkElement).toBeInTheDocument();
    expect(navLinkElement).toHaveAttribute(
      "aria-label",
      "freetypingcamp.com logo as navigation link with highlight when hovered or clicked"
    );
  });

  it("should render the logo and call setShowMobileMenu with false when clicked", () => {
    MockLogo({ darkThemeActive: false });

    const navLinkElement = screen.getByTestId("logo-naviation-link");
    fireEvent.click(navLinkElement);
    expect(setShowMobileMenu).toHaveBeenCalledWith(false);
  });

  it("should render with correct text and styles when darkThemeActive is true", () => {
    MockLogo({ darkThemeActive: true });

    const logoLongText = screen.getByText("WordSkull");
    const logoComText = screen.getByText(".com");

    expect(logoLongText).toHaveClass("text-white");
    expect(logoComText).toHaveClass("text-white");
  });

  it("should not render with text-white class when darkThemeActive is false", () => {
    MockLogo({ darkThemeActive: false });

    const logoLongText = screen.getByText("WordSkull");
    const logoComText = screen.getByText(".com");

    expect(logoLongText).not.toHaveClass("text-white");
    expect(logoComText).not.toHaveClass("text-white");
  });
});
