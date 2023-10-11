import React from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
const AppBar = () => {
  return (
    <div className="app-bar">
      <div className="left">
        {/* left icon */}
        <img src="/Assets/icon.jpg" alt="Icon" />
      </div>
      <div className="right">
        <div className="button">
          <button>Login</button>
        </div>
        <div className="links">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild><p>Workspace</p></DropdownMenu.Trigger>
            <DropdownMenu.Content>
            <Link href="/components/submission">
                <DropdownMenu.Item> Moderator</DropdownMenu.Item>
              </Link>

              <Link href="/components/submission">
              <DropdownMenu.Item> Analyst</DropdownMenu.Item>
              </Link>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <Link href="/" passHref>
            <p>Search</p>
          </Link>
          <Link href="/components/submission">
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
          width: 85px;
          height: 85px;
        }
        .right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .button {
          margin-top: -5px;
          margin-right: 0px;
        }
        .button button {
          background-color: #910002;
          color: white;
          border: 1px solid #ccc;
          padding: 5px 5px;
          cursor: pointer;
        }
        .right .links {
          display: flex;
          margin-top: 20px;
        }
        .links p {
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
