"use client";
import React, { useState } from "react";
import { CiSearch } from 'react-icons/ci';

import AppBar from "./components/navigation/AppBar";
const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/query', {
        method: 'GET', 
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResult(`User ID: ${data.id}`);
      } else {
        setSearchResult('User not found');
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };
  return (
    <div>
      <AppBar />
      <br></br>
      <br></br>

      <h1>Explore the world’s knowledge, cultures, and ideas</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search journals. books, images, and primary sources" />
        <span className="search-icon">
          <CiSearch />
        </span>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh; 
        }
        h1 {
          font-family: "Times New Roman", Times, serif;
          text-align: center; 
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
  );
};

export default HomePage;
