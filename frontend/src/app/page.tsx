"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

import AppBar from "./components/navigation/AppBar";
const HomePage: React.FC = () => {
  return (
    <div>
      <AppBar/>

      <div className="container mx-auto px-4">
        <h1>Explore the world’s knowledge, cultures, and ideas</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <span className="search-icon">
            <CiSearch />
          </span>
        </div>
        <style jsx>{`
          h1 {
            font-family: "Times New Roman", Times, serif;
          }
          .search-bar {
            margin-top: 20px;
            display: flex;
            align-items: center;
            border: 1px solid #ccc;
            padding: 8px;
          }
          .search-bar input {
            flex: 1;
            border: none;
            outline: none;
            font-size: 16px;
          }
          .search-icon {
            margin-left: 8px;
            font-size: 24px;
            cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  );
};

export default HomePage;
