"use client";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Search from "./Search";
import AppBar from "../navigation/AppBar";

type SearchResult = { [key: string]: string };
function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSearchHistory, setShowSearchHistory] = useState(true);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
    setShowSearchHistory(true);
  }, []);

  const handleIconClick = (
    eventOrQuery?: React.MouseEvent<HTMLSpanElement> | string
  ) => {
    let currentQuery = searchQuery;

    if (typeof eventOrQuery === "string") {
      currentQuery = eventOrQuery;
    }

    if (!searchHistory.includes(currentQuery)) {
      const updatedHistory = [currentQuery, ...searchHistory];
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }

    if (currentQuery.trim() === "") {
      setSearchResult([{ Message: "please input a keyword" }]);
    } else if (/^\d+$/.test(currentQuery.trim())) {
      setSearchResult([{ Message: "Please enter a non-numeric keyword" }]);
    } else {
      handleSearch(currentQuery);
    }
    setShowSearchHistory(false);
  };

  const handleSearch = async (query: string) => {
    const results = await Search(query);

    if (typeof results === "string") {
      setSearchResult([{ Message: results }]);
      return;
    }

    let tempArray: string[] = [];
    const resultsObjects: SearchResult[] = [];

    results.forEach((item: string) => {
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

  const handleSortClick = (columnKey: string) => {
    if (sortField === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(columnKey);
      setSortDirection("asc");
    }

    const sortedResults = [...searchResult].sort((a, b) => {
      if (a[columnKey] < b[columnKey]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[columnKey] > b[columnKey]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSearchResult(sortedResults);
  };

  const handleHistoryClick = (historyQuery: string) => {
    setSearchQuery(historyQuery); // Update the input field value
    handleIconClick(historyQuery); // Search using the selected history query
  };

  const displayOrder = [
    "Title",
    "Authors",
    "Journal",
    "Year",
    "Pages",
    "Volume",
    "DOI",
  ];

  return (
    <div>
      <AppBar />
      <div className="content">
        <h1>Explore the world’s knowledge, cultures, and ideas</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search journals. books, images, and primary sources"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchHistory(true)}
          />
          <span className="search-icon" onClick={handleIconClick}>
            <CiSearch />
          </span>
        </div>

        {showSearchHistory && (
          <div className="search-history">
            <h2>Search History</h2>
            <ul>
              {searchHistory.map((query, index) => (
                <li key={index} onClick={() => handleHistoryClick(query)}>
                  {query}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="search-results">
          <table>
            <tbody>
              {searchResult.length > 0 &&
              searchResult[0].hasOwnProperty("Message") ? (
                <tr>
                  <td>{searchResult[0].Message}</td>
                </tr>
              ) : (
                <>
                  {searchResult.length > 0 && (
                    <tr>
                      {displayOrder.map((key) => (
                        <th key={key} onClick={() => handleSortClick(key)}>
                          {key}
                          {sortField === key &&
                            (sortDirection === "asc" ? " ↑" : " ↓")}
                        </th>
                      ))}
                    </tr>
                  )}
                  {searchResult.map((result, rowIndex) => (
                    <tr key={rowIndex}>
                      {displayOrder.map((key) => (
                        <td key={key}>{result[key]}</td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .content {
            padding-top: 90px; 
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
        .search-history {
          padding: 20px;
          position: absolute;
          background-color: #fff;
          border: 1px solid #ccc;
          max-height: 150px;
          overflow-y: auto;
          width: calc(100% - 40px);
        }
        .search-history ul {
          list-style-type: none;
          padding: 0;
        }
        .search-history li {
          cursor: pointer;
          padding: 5px;
          border: 1px solid #ccc;
          margin-bottom: 5px;
          margin-top: 0;
        }
      `}</style>
    </div>
  );
}
export default SearchPage;
