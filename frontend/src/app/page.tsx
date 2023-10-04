"use client";
import React, { useState } from "react";
import { CiSearch } from 'react-icons/ci';

import AppBar from "./components/AppBar";
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
        if (data) {
          let resultText = 'Search Result:\n';
          // 遍历需要的属性并将它们添加到结果文本中
          const properties = ['authors', 'DOI', 'Journal name', 'Pages', 'Title', 'Volume', 'Year of publication'];
          console.log('Properties array:', properties);

          resultText += JSON.stringify(data, null, 2);
          
          console.log(properties);
          console.log(data);
          console.log(resultText);

          setSearchResult(resultText);
        } else {
          setSearchResult('No data found');
        }
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
      <div className="container mx-auto px-4">
        <h1>Explore the world’s knowledge, cultures, and ideas</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          <span className="search-icon" onClick={handleSearch}><CiSearch/></span> {/* 添加点击事件 */}
        </div>
        <p>{searchResult}</p>
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
  );
};

export default HomePage;