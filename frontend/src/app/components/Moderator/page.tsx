// page.tsx
"use client";
import React from "react";
import AppBar from "../navigation/AppBar";
import classes from "./submission.module.css";
import sendDataToServer from './sendData';
import ArticleSearch from './ArticleSearch'; 

function Submission() {
  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();
  

  }

  return (
    <div>
      <AppBar />
      <div>
        <ArticleSearch /> {}
        
        <form className={classes.form} onSubmit={submitHandler}>
          {}
        </form>
      </div>
    </div>
  );
}

export default Submission;
