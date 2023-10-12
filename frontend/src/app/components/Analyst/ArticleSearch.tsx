// ArticleSearch.tsx
import React, { useRef, useState } from "react";
import classes from "./submission.module.css"; // Import the CSS styles

function ArticleSearch() {
  // Create a reference to the article title input and initialize state variables
  const articleTitleInputRef = useRef<HTMLInputElement | null>(null);
  const [articleDetails, setArticleDetails] = useState<any>(null);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null); // State for the not found message

  // Function to search for an article
  async function searchArticle(event: React.FormEvent) {
    event.preventDefault();

    // Get the article title from the input field
    const articleTitle = articleTitleInputRef.current?.value;

    if (!articleTitle) {
      alert("Please enter the article title.");
      return;
    }

    // Reset the notFoundMessage
    setNotFoundMessage(null);

    // fetch article details based on the title.
    const dummyArticleDetails = {
      Title: articleTitle,
      Author: "Author Name",
      Journal: "Journal Name",
      Year: 2023,
      Volume: "Volume Number",
      Pages: "1-10",
      DOI: "12345/DOI",
    };

    // Check if the article is found
    if (dummyArticleDetails) {
      setArticleDetails(dummyArticleDetails);
    } else {
      // Display a not found message
      setNotFoundMessage("Could not find this article, try again.");
    }
  }

  return (
    <div className={classes.container}>
      {/* Added a title for the page */}
      <h1 className={classes.title}>ANALYST PAGE</h1>

      <form onSubmit={searchArticle} className={classes.form}>
        <div className={classes.center}>
          <label htmlFor="articleTitle" className={classes.label}>
            Article Title:
          </label>
          <input
            type="text"
            id="articleTitle"
            name="articleTitle"
            required
            ref={articleTitleInputRef}
            className={classes.input}
          />
        </div>
        <div className={classes.center}>
          <button type="submit" className={classes.button}>
            Search
          </button>
        </div>
      </form>

      {/* Display a not found message if the article is not found */}
      {notFoundMessage && (
        <div className={classes.notFoundMessage}>{notFoundMessage}</div>
      )}

      {articleDetails && (
        <div className={classes.articleDetails}>
          <h2>Article Details</h2>
          <p>Article Title: {articleDetails.Title}</p>
          {/* You can add more details here */}
        </div>
      )}
    </div>
  );
}

export default ArticleSearch;
