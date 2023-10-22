"use client"
import React, { useState, useEffect } from "react";

import AppBar from "./components/navigation/AppBar";

type SearchResult = { [key: string]: string };

const HomePage: React.FC = () => {

  return (
    <div>
      <AppBar/>
      <h1>Explore the world’s knowledge, cultures, and ideas</h1>


    </div>
  );
};

export default HomePage;