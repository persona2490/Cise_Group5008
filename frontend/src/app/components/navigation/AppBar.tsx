import React, { Component } from "react";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

class AppBar extends Component {
  render() {
    return (
      <div className="app-bar">
        <div className="left">
          {/* left icon */}
          <img src="/Assets/icon.jpg" alt="Icon" />
          
        </div>
        <h1>SPEED</h1>
        <div className="right">
          <div className="button">
            <button>Login</button>
          </div>
          <div className="links">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <a>Workspace</a>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <Link href="/components/Moderator" passHref>
                  <DropdownMenu.Item> Moderator</DropdownMenu.Item>
                </Link>

                <Link href="/components/analyst" passHref>
                  <DropdownMenu.Item> Analyst</DropdownMenu.Item>
                </Link>
                <Link href="/components/admin" passHref>
                  <DropdownMenu.Item> Admin</DropdownMenu.Item>
                </Link>
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <Link legacyBehavior href="/" passHref>
              <a>Search</a>
            </Link>
            <Link legacyBehavior href="/components/submission" passHref>
              <a>Submit</a>
            </Link>
            <Link legacyBehavior href="/page3" passHref>
              <a>About</a>
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
            width: 95px;
            height: 95px;
          }
          .right {
            margin-top: -20px;
            margin-bottom: 0px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
          .button {
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
            margin-top: 50px;
          }
          .links p {
            margin-left: 16px;
            color: black;
            text-decoration: none !important;
            cursor: pointer;
            margin-bottom: 0;
          }
          .links a {
            margin-left: 16px;
            color: black;
            text-decoration: none !important;
            cursor: pointer;
            margin-bottom: -20px;
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  }
}

export default AppBar;
