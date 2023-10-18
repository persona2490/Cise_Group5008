"use client"
import React, { useEffect, useState } from "react";
import AppBar from "../navigation/AppBar";
import classes from "./submission.module.css";
import ArticleSearch from "./ArticleSearch";

function Moderator() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        let response = await fetch("/query_unpublished");
        let data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div>
      <AppBar />
      <div className={classes.tableRow}>
        {/* ... table headers as before ... */}
      </div>
      <ArticleSearch />
      
      {/* Render articles from the state */}
      {articles.map((article, index) => (
        <div key={article._id} className={classes.tableRow}>
          <div className={classes.articleText}>{article.Title}</div>
          {/* Display the first author from the Authors array */}
          <div className={classes.articleText}>{article.Authors[0]}</div>
          <div className={classes.articleText}>{article.Journal}</div>
          <div className={classes.articleText}>{article.Year}</div>
          <div className={classes.articleText}>{article.Volume}</div>
          <div className={classes.articleText}>{article.Pages}</div>
          <div className={classes.articleText}>{article.DOI}</div>
          <div className={classes.articleText}>
            {/* You can add actions buttons here if needed */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Moderator;