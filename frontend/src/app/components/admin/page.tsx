// page.tsx
"use client";
import React from "react";
import AppBar from "../navigation/AppBar";
import AdminPage from "./Admin";
import styles from "./admin.module.css";
function Administor() {


  return (
    <div>
      <AppBar /> 
      <div className={styles.content}>
        <AdminPage /> 
      </div>
    </div>
  );
}

export default Administor;
