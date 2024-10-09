import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Icon from "../Icon";
describe("renders correct icons", () => {
  it("should render the copy icon with the correct name", () => {
    render(<Icon icon="copy" title="Copy Icon" customStyle="bg-black" />);
    const iconElement = screen.getByTestId(/CopyIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the copyPhotoIcon with the correct name", () => {
    render(
      <Icon
        icon="copyPhotoIcon"
        title="Copy Photo Icon"
        customStyle="bg-black"
      />
    );
    const iconElement = screen.getByTestId(/CollectionsRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the dice icon with the correct name", () => {
    render(<Icon icon="dice" title="Dice Icon" customStyle="bg-black" />);
    const iconElement = screen.getByTestId(/DiceIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the heart icon with the correct name", () => {
    render(<Icon icon="heart" title="Heart Icon" customStyle="bg-black" />);
    const iconElement = screen.getByTestId(/FavoriteRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the deselect icon with the correct name", () => {
    render(
      <Icon icon="deselect" title="Deselect Icon" customStyle="bg-black" />
    );
    const iconElement = screen.getByTestId(/DoNotDisturbRounded/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the viewPage icon with the correct name", () => {
    render(
      <Icon icon="viewPage" title="View Page Icon" customStyle="bg-black" />
    );
    const iconElement = screen.getByTestId(/ViewPageIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the burgerClosed icon with the correct name", () => {
    render(
      <Icon
        icon="burgerClosed"
        title="Burger Closed Icon"
        customStyle="bg-black"
      />
    );
    const iconElement = screen.getByTestId(/MenuRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the burgerOpen icon with the correct name", () => {
    render(
      <Icon icon="burgerOpen" title="Burger Open Icon" customStyle="bg-black" />
    );
    const iconElement = screen.getByTestId(/MenuOpenRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the statsChart icon with the correct name", () => {
    render(
      <Icon icon="statsChart" title="Stats Chart Icon" customStyle="bg-black" />
    );
    const iconElement = screen.getByTestId(/AutoGraphIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the settingSparkle icon with the correct name", () => {
    render(
      <Icon
        icon="settingSparkle"
        title="Setting Sparkle Icon"
        customStyle="bg-black"
      />
    );
    const iconElement = screen.getByTestId(/SettingsSuggestIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the barGraph icon with the correct name", () => {
    render(
      <Icon icon="barGraph" title="Bar Graph Icon" customStyle="bg-black" />
    );
    const iconElement = screen.getByTestId(/LeaderboardRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the info icon with the correct name", () => {
    render(<Icon icon="info" title="Info Icon" customStyle="bg-black" />);
    const iconElement = screen.getByTestId(/InfoRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the share icon with the correct name", () => {
    render(<Icon icon="share" title="Share Icon" customStyle="bg-black" />);
    const iconElement = screen.getByTestId(/ReplyRoundedIconReversed/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the question icon with the correct name", () => {
    render(
      <Icon icon="question" title="Question Icon" customStyle="bg-black" />
    );
    const iconElement = screen.getByTestId(/HelpOutlineRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the flag icon with the correct name", () => {
    render(<Icon icon="flag" title="Flag Icon" customStyle="bg-black" />);
    const iconElement = screen.getByTestId(/SportsScoreIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the close icon with the correct name", () => {
    render(<Icon icon="close" title="Close Icon" customStyle="bg-black" />);
    const iconElement = screen.getByTestId(/CloseRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should render the arrowLeft icon with the correct name", () => {
    render(
      <Icon icon="arrowLeft" title="Arrow Left Icon" customStyle="bg-black" />
    );
    const iconElement = screen.getByTestId(/ArrowLeftIcon/i);
    expect(iconElement).toBeInTheDocument();
  });
});
