import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppBar from "./AppBar";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("AppBar Component", () => {
  it("should navigate to Workspace page on Workspace link click", () => {
    const pushMock = jest.fn();
    useRouter.mockImplementation(() => ({
      push: pushMock,
    }));

    const { getByText } = render(<AppBar />);
    const workspaceLink = getByText("Workspace");
    fireEvent.click(workspaceLink);

    expect(pushMock).toHaveBeenCalledWith("/page1");
  });

  it("should navigate to Search page on Search link click", () => {
    const pushMock = jest.fn();
    useRouter.mockImplementation(() => ({
      push: pushMock,
    }));

    const { getByText } = render(<AppBar />);
    const searchLink = getByText("Search");
    fireEvent.click(searchLink);

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  // Similar tests for other links (Submit, About) can be added here.
});
