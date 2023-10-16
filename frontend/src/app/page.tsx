"use client";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Search from "../../components/Search";
import AppBar from "./components/navigation/AppBar";

type SearchResult = { [key: string]: string };

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

  const handleIconClick = async () => {
    console.log("Input changed:", searchQuery);
    if (searchQuery.trim() === "") {
      setSearchResult([{ Message: "please input a keyword" }]);
    } else if (/^\d+$/.test(searchQuery.trim())) {
      setSearchResult([{ Message: "Please enter a non-numeric keyword" }]);
    } else {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const results = await Search(searchQuery);
  
    if (typeof results === "string") {
      setSearchResult([{ Message: results }]);
      return;
    }
  
    let tempArray: string[] = [];
    const resultsObjects: SearchResult[] = [];
  
    results.forEach((item) => {
      if (item !== "") {
        tempArray.push(item);
      } else if (tempArray.length > 0) {
        const obj = tempArray.reduce<SearchResult>((acc, line) => {
          const [key, value] = line.split(":");
          if (key && value !== undefined) {
            acc[key.trim()] = value.trim();
          }
          return acc;
        }, {});
        resultsObjects.push(obj);
        tempArray = [];
      }
    });
  
    if (tempArray.length > 0) {
      const obj = tempArray.reduce<SearchResult>((acc, line) => {
        const [key, value] = line.split(":");
        if (key && value !== undefined) {
          acc[key.trim()] = value.trim();
        }
        return acc;
      }, {});
      resultsObjects.push(obj);
    }
  
    setSearchResult(resultsObjects);
  };

  return (
    <div>
      <AppBar />
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
      <br></br>
      <div className="search-results">
  <table>
    <tbody>
      {searchResult.length > 0 && searchResult[0].hasOwnProperty("Message") ? (
        <tr>
          <td>{searchResult[0].Message}</td>
        </tr>
      ) : (
        <>
          {searchResult.length > 0 && (
            <tr>
              {Object.keys(searchResult[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          )}
          {searchResult.map((result, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(result).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </>
      )}
    </tbody>
  </table>
</div>

      <style jsx>{`
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
        table {
          border-collapse: collapse;
          width: 100%;
          border: 1px solid #ccc;
        }
        th,
        td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
