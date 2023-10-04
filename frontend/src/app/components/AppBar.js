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
        {/* 使用 passHref 属性将 href 传递给子元素 */}
        <div className="links">
          <Link href="/page1" passHref>
            <p>Page 1</p>
          </Link>
          <Link href="/page2" passHref>
            <p>Page 2</p>
          </Link>
          <Link href="/page3" passHref>
            <p>Page 3</p>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .app-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          height :20px;
          background-color: white;
          color: white;
        }
        .left img {
          width: 24px;
          height: 24px;
        }
        .right .links {
          display: flex;
          align-items: flex-end; /* 文字底部对齐 */
        }
        .right .links p {
          margin-left: 16px;
          color: black; /* 文字颜色改为黑色 */
          text-decoration: none !important;
          cursor: pointer;
          margin-bottom: 0; /* 去除底部边距 */
        }
      `}</style>
    </div>
  );
};

export default AppBar;
