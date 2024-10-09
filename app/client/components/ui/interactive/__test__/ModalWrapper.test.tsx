import { render, screen, fireEvent } from "@testing-library/react";
import MockThemeProvider from "../../../../mocks/components/MockThemeContext"; // Assuming you have a similar MockThemeProvider
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import ModalWrapper from "../ModalWrapper";
import { describe, expect, it, vi } from "vitest";

interface ModalPropType {
  setShowModal: (value: boolean) => void;
  children: JSX.Element;
  customClass?: string;
  showModal: boolean;
}

// Create a mock ModalWrapper with MockThemeProvider and MemoryRouter
const MockModalWrapper = ({
  setShowModal,
  children,
  customClass,
  showModal,
}: ModalPropType) => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={true}>
        <ModalWrapper
          setShowModal={setShowModal}
          customClass={customClass}
          showModal={showModal}
        >
          {children}
        </ModalWrapper>
      </MockThemeProvider>
    </MemoryRouter>
  );
};

const setShowModalMock = vi.fn();

describe("modal wrapper renders modal correctly", () => {
  beforeEach(() => {
    MockModalWrapper({
      setShowModal: setShowModalMock,
      children: <div data-testid="child">Child Content</div>,
      customClass: "custom-modal-class",
      showModal: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render children correctly", () => {
    const childElement = screen.getByTestId("child");
    expect(childElement).toBeInTheDocument();
  });

  it("should render the modal background underlay", () => {
    const buttonElement = screen.getByTestId("modal-background");

    expect(buttonElement).toBeInTheDocument();
  });

  it("should render the close modal button", () => {
    const buttonElement = screen.getByTestId("close-modal");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should apply customClass if provided", () => {
    const childEelement = screen.getByTestId("child").parentElement;
    expect(childEelement).toHaveClass("custom-modal-class");
  });

  it("should handle multiple modal instances correctly if rendered simultaneously", () => {
    MockModalWrapper({
      setShowModal: setShowModalMock,
      showModal: true,
      children: <div data-testid="child-1">Child Content 1</div>,
    });
    MockModalWrapper({
      setShowModal: setShowModalMock,
      showModal: true,
      children: <div data-testid="child-2">Child Content 2</div>,
    });

    const childElement1 = screen.getByTestId("child-1");
    const childElement2 = screen.getByTestId("child-2");

    expect(childElement1).toBeInTheDocument();
    expect(childElement2).toBeInTheDocument();
  });
});

describe("handles user events correctly", () => {
  beforeEach(() => {
    MockModalWrapper({
      setShowModal: setShowModalMock,
      children: <div data-testid="child">Child Content</div>,
      customClass: "custom-modal-class",
      showModal: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not close the modal when clicking inside the modal content", () => {
    const childElement = screen.getByTestId("child");
    fireEvent.click(childElement);
    expect(setShowModalMock).not.toHaveBeenCalled();
  });

  it("should block interaction with content behind the modal", () => {
    const buttonElement = screen.getByTestId("modal-background");
    fireEvent.click(buttonElement);

    expect(setShowModalMock).toHaveBeenCalled();
  });

  it("should close the modal when the background is clicked", () => {
    const buttonElement = screen.getByTestId("modal-background");
    fireEvent.click(buttonElement);

    expect(setShowModalMock).toHaveBeenCalledWith(false);
  });

  it("should close the modal when the close button is clicked", () => {
    const buttonElement = screen.getByTestId("close-modal");
    fireEvent.click(buttonElement);

    expect(setShowModalMock).toHaveBeenCalledWith(false);
  });
});

describe("should not render", () => {
  it("should not render modal when showModal is false", () => {
    MockModalWrapper({
      setShowModal: setShowModalMock,
      children: <div data-testid="child"></div>,
      customClass: "custom-modal-class",
      showModal: false,
    });
    const childElement = screen.queryByTestId("child");
    expect(childElement).not.toBeInTheDocument();
  });
});
