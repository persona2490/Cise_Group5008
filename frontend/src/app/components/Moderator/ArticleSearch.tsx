import React, { useState, useEffect } from "react";
import axios from 'axios';
import classes from "./submission.module.css";

function ArticleSearch() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);
  const [userInputs, setUserInputs] = useState<Array<string[]>>([]);
  
  // Fetch articles from the backend on component mount
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('http://localhost:5000/api/query_unpublished'); 
        if (response.data && response.data.length > 0) {
          setArticles(response.data);
        } else {
          setNotFoundMessage("No unpublished and unaccepted articles found");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setNotFoundMessage("Error fetching articles.");
      }
    }
    fetchArticles();
  }, []);

  // Function to delete a row
  function deleteRow(rowIndex: number) {
    const updatedUserInputs = [...userInputs];
    updatedUserInputs.splice(rowIndex, 1);
    setUserInputs(updatedUserInputs);
  }

  // Function to handle accepting an article (note: you'll need to define backend calls here)
  function acceptArticle(event: React.MouseEvent<HTMLButtonElement>, articleId: string) {
    console.log("Accepted article with ID:", articleId);
    // TODO: Implement API call to update the article as accepted
  }

  // Function to handle declining an article (note: you'll need to define backend calls here)
  function declineArticle(event: React.MouseEvent<HTMLButtonElement>, articleId: string) {
    console.log("Declined article with ID:", articleId);
    // TODO: Implement API call to update the article as declined or deleted
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

      {articles.map((article, index) => (
        <div key={index} className={classes.tableRow}>
          <div className={classes.articleText}>{article.Title}</div>
          <div className={classes.articleText}>{article.Authors}</div>
          <div className={classes.articleText}>{article.Journal}</div>
          <div className={classes.articleText}>{article.Year}</div>
          <div className={classes.articleText}>{article.Volume}</div>
          <div className={classes.articleText}>{article.Pages}</div>
          <div className={classes.articleText}>{article.DOI}</div>
          <div>
          <button onClick={(e) => acceptArticle(e, article._id)}>ACCEPT</button>
          <button onClick={(e) => declineArticle(e, article._id)}>DECLINE</button>
          </div>
        </div>
      ))}

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
        </div>
      ))}

      {notFoundMessage && (
        <div className={classes.notFoundMessage}>{notFoundMessage}</div>
      )}
    </div>
  );
}

export default ArticleSearch;

type Article = {
  _id: string;
  Title: string;
  Authors: string;
  Journal: string;
  Year: number;
  Volume: string;
  Pages: string;
  DOI: string;
  isPublished: boolean;
  isAccepted: boolean;
};