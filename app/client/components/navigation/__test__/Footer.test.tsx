import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import Footer from "../Footer";
import MockThemeProvider from "../../../mocks/components/MockThemeContext";

const MockFooter = ({ darkThemeActive }: { darkThemeActive: boolean }) => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={darkThemeActive}>
        <Footer />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

describe("Should render default elements", () => {
  beforeEach(() => {
    MockFooter({ darkThemeActive: false }); // Call the mock footer with light theme before each test
  });

  it("should render the correct copyright text", () => {
    const textElement = screen.getByText(/© 2024/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should display 'WordSkull' and 'All Rights Reserved'", () => {
    const textElement1 = screen.getByText(/WordSkull/i);
    const textElement2 = screen.getByText(/All Rights Reserved/i);
    expect(textElement1).toBeInTheDocument();
    expect(textElement2).toBeInTheDocument();
  });

  it("should render a nav element", () => {
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("should render navigation link for sitemap with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /Sitemap/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/sitemap");
  });

  it("should render navigation link for privacy policy with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /privacy/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/privacy-policy");
  });

  it("should render navigation link for terms of service with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /terms of service/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/terms-of-service");
  });
  it("should render navigation link for cookies policy with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /cookie/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/cookies-policy");
  });
});
