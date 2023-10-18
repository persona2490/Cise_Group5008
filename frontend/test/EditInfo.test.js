import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditInfo from "./EditInfo";

describe("EditInfo component", () => {
  it("should render EditInfo component with provided article data", () => {
    const mockArticle = {
      _id: "article123",
      Title: "Sample Title",
      Authors: "John Doe",
      Journal: "Sample Journal",
      Year: 2022,
      Pages: "10-20",
      IsAccepted: true,
      isPublished: true,
      DOI: "sample-doi"
    };

    const { getByLabelText } = render(<EditInfo article={mockArticle} onClick={() => {}} />);

    expect(getByLabelText("Title")).toHaveValue(mockArticle.Title);
    expect(getByLabelText("Author")).toHaveValue(mockArticle.Authors);
    expect(getByLabelText("Journal Name")).toHaveValue(mockArticle.Journal);
    expect(getByLabelText("Years")).toHaveValue(mockArticle.Year.toString());
    expect(getByLabelText("Pages")).toHaveValue(mockArticle.Pages);
  });

  it("should update the article when 'Submit' button is clicked", () => {
    const mockArticle = {
      _id: "article123",
      Title: "Sample Title",
      Authors: "John Doe",
      Journal: "Sample Journal",
      Year: 2022,
      Pages: "10-20",
      IsAccepted: true,
      isPublished: true,
      DOI: "sample-doi"
    };

    const onClickMock = jest.fn();
    const { getByText } = render(<EditInfo article={mockArticle} onClick={onClickMock} />);

    fireEvent.change(getByLabelText("Title"), { target: { value: "Updated Title" } });
    fireEvent.change(getByLabelText("Author"), { target: { value: "Jane Smith" } });

    fireEvent.click(getByText("Submit"));
    
    expect(onClickMock).toHaveBeenCalled();
  });
});