// page.tsx
"use client";
import React from "react";
import AppBar from "../navigation/AppBar";
import AdminPage from "./Admin";

function Administor() {


  return (
    <div>
      <AppBar /> 
      <div>
        <AdminPage /> 
      </div>
    </div>
  );
}

export default Administor;
