// page.tsx
"use client";
import React from "react";
import AppBar from "../navigation/AppBar";
import classes from "./submission.module.css";
import sendDataToServer from './sendData';
import ArticleSearch from './ArticleSearch'; // Import the ArticleSearch component

function Submission() {
  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();
  
    // Your existing form submission logic
  }

  return (
    <div>
      <AppBar />
      <div>
        <ArticleSearch /> {/* Include the ArticleSearch component here */}
        
        <form className={classes.form} onSubmit={submitHandler}>
          {/* Your existing form content */}
        </form>
      </div>
    </div>
  );
}

export default Submission;
