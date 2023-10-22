// page.tsx
"use client";
import React from "react";
import AppBar from "../navigation/AppBar";
import Moderatorpage from "./moderator";
import styles from "./moderator.module.css";
function Moderator() {


  return (
    <div>
      <AppBar title="Moderator Page" /> 
      <div className={styles.content}>
        <Moderatorpage /> 
      </div>
    </div>
  );
}

export default Moderator;
