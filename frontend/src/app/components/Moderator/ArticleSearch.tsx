import React, { useState } from "react";
import classes from "./submission.module.css";

function ArticleSearch() {
  // State for article details, not found message, and user inputs
  const [articleDetails, setArticleDetails] = useState<any>(null);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);
  const [userInputs, setUserInputs] = useState<Array<string[]>>([]);

  // Function to search for an article - replace with actual logic
  async function searchArticle(event: React.FormEvent) {
    event.preventDefault();
    const dummyArticleDetails = {
      Title: "Article Title",
      Author: "Author Name",
      Journal: "Journal Name",
      Year: 2023,
      Volume: "Volume Number",
      Pages: "1-10",
      DOI: "12345/DOI",
    };

    if (dummyArticleDetails) {
      setArticleDetails(dummyArticleDetails);
    } else {
      setNotFoundMessage("Could not find this article, try again.");
    }
  }

  // Function to add a new row with user inputs
  function addRow() {
    const newRow: string[] = new Array(8).fill("");
    setUserInputs([...userInputs, newRow]);
  }

  // Function to delete a row
  function deleteRow(rowIndex: number) {
    const updatedUserInputs = [...userInputs];
    updatedUserInputs.splice(rowIndex, 1);
    setUserInputs(updatedUserInputs);
  }

  // Function to handle accepting an article
  function acceptArticle() {
    console.log("Accepted article");
  }

  // Function to handle declining an article
  function declineArticle() {
    console.log("Declined article");
  }

  // Function to handle input changes in the table
  function handleInputChange(rowIndex: number, colIndex: number, value: string) {
    const updatedUserInputs = [...userInputs];
    updatedUserInputs[rowIndex][colIndex] = value;
    setUserInputs(updatedUserInputs);
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>MODERATOR PAGE</h1>

      <div className={classes.tableRow}>
        <div className={classes.articleText}>Article Title</div>
        <div className={classes.articleText}>Author Name</div>
        <div className={classes.articleText}>Journal Name</div>
        <div className={classes.articleText}>Year</div>
        <div className={classes.articleText}>Volume Number</div>
        <div className={classes.articleText}>Pages</div>
        <div className={classes.articleText}>DOI</div>
        <div className={classes.articleText}>Actions</div>
      </div>

      {articleDetails && (
        <div className={classes.tableRow}>
          <div className={classes.articleText}>{articleDetails.Title}</div>
          <div className={classes.articleText}>{articleDetails.Author}</div>
          <div className={classes.articleText}>{articleDetails.Journal}</div>
          <div className={classes.articleText}>{articleDetails.Year}</div>
          <div className={classes.articleText}>{articleDetails.Volume}</div>
          <div className={classes.articleText}>{articleDetails.Pages}</div>
          <div className={classes.articleText}>{articleDetails.DOI}</div>
          <div>
            <button className={classes.acceptButton} onClick={acceptArticle}>
              ACCEPT
            </button>
            <button className={classes.declineButton} onClick={declineArticle}>
              DECLINE
            </button>
          </div>
        </div>
      )}

      {userInputs.map((row, rowIndex) => (
        <div key={rowIndex} className={classes.tableRow}>
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={classes.articleText}>
              <input
                type="text"
                value={cell}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, e.target.value)
                }
                style={{ width: "70px" }}
              />
            </div>
          ))}
          <div>
            <button className={classes.acceptButton} onClick={acceptArticle}>
              ACCEPT
            </button>
            <button className={classes.declineButton} onClick={declineArticle}>
              DECLINE
            </button>
            <button
              className={classes.declineButton}
              onClick={() => deleteRow(rowIndex)}
            >
              Delete Row
            </button>
          </div>
        </div>
      ))}

      {notFoundMessage && (
        <div className={classes.notFoundMessage}>{notFoundMessage}</div>
      )}

      <button className={classes.acceptButton} onClick={addRow}>
        Add Row
      </button>
    </div>
  );
}

export default ArticleSearch;
