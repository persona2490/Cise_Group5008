"use client"
import React, { useState } from "react";
import { CiSearch } from 'react-icons/ci';
import Search from '../../components/Search';  
import AppBar from "./components/navigation/AppBar";
const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const handleIconClick = async () => {
    console.log("Input changed:", searchQuery);
    if (searchQuery.trim() === '') {
        setSearchResult(['please input a keyword']);
    } else if (/^\d+$/.test(searchQuery.trim())) {
        setSearchResult(['Please enter a non-numeric keyword']);
    } else {
        handleSearch();
    }
};

  const handleSearch = async () => {
      const result = await Search(searchQuery);
      setSearchResult(result);
  };
  return (
      <div>
          <AppBar />
          <br></br>
          <br></br>

          <h1>Explore the world’s knowledge, cultures, and ideas</h1>
          <div className="search-bar">
          <input 
              type="text" 
              placeholder="Search journals. books, images, and primary sources" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
          />
              <span className="search-icon" onClick={handleIconClick}>
                  <CiSearch />
              </span>
          </div>

            <div className="search-results">
                {searchResult.map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
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