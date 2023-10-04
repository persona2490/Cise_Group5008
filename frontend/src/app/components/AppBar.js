import React from 'react';
import Link from 'next/link';

const AppBar = () => {
  return (
    <div className="app-bar">
      <div className="left">
        {/* 左侧图标 */}
        <img src="/path/to/icon.png" alt="Icon" />
      </div>
      <div className="right">
        <div className="button">
          <button>Login</button>
        </div>
        <div className="links">
          <Link href="/page1" passHref>
            <p>Workspace</p>
          </Link>
          <Link href="/page2" passHref>
            <p>Search</p>
          </Link>
          <Link href="/page3" passHref>
            <p>Submit</p>
          </Link>
          <Link href="/page3" passHref>
            <p>About</p>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .app-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          height: 70px;
          background-color: white;
          color: black;
          border: 1px solid #ccc;
        }
        .left img {
          width: 24px;
          height: 24px;
        }
        .right {
          display: flex;
          
        }
        .button {
          margin-right: 16px;
        }
        .button button {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
        }
        .right .links {
          display: flex;
          
        }
        .right .links p {
          margin-left: 16px;
          color: black;
          text-decoration: none;
          cursor: pointer;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default AppBar;
