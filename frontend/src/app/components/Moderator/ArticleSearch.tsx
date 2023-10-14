// ArticleSearch.tsx
import React, { useState } from "react";
import classes from "./submission.module.css";

function ArticleSearch() {
  const [articleDetails, setArticleDetails] = useState<any>(null);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);

  // Function to search for an article - you can replace this function if needed
  async function searchArticle(event: React.FormEvent) {
    event.preventDefault();

    // Replace this with your actual logic to retrieve article details

    const dummyArticleDetails = {
      Title: "Article Title",
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
      <h1 className={classes.title}>MODERATOR PAGE</h1>

      <div className={classes.tableRow}>
        <p className={classes.articleText}>ARTICLE 1</p>
        <button className={classes.detailButton}>DETAILS</button>
        <button className={classes.acceptButton}>ACCEPT</button>
        <button className={classes.declineButton}>DECLINE</button>
      </div>

      {/* Empty article sections */}
      <div className={classes.emptyArticleSection}></div>
      <div className={classes.emptyArticleSection}></div>
      <div className={classes.emptyArticleSection}></div>
      <div className={classes.emptyArticleSection}></div>
      <div className={classes.emptyArticleSection}></div>
      <div className={classes.emptyArticleSection}></div>
      <div className={classes.emptyArticleSection}></div>
      <div className={classes.emptyArticleSection}></div>

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