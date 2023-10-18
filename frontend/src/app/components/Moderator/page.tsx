// page.tsx
"use client";
import React from "react";
import AppBar from "../navigation/AppBar";
import classes from "./submission.module.css";
import ArticleSearch from "./ArticleSearch";

function Moderator() {


  return (
    <div>
      <AppBar />
      <div>
        <ArticleSearch /> {}

      </div>
    </div>
  );
}

export default Moderator;
