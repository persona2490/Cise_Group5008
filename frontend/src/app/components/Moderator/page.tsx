// page.tsx
"use client";
import React from "react";
import AppBar from "../navigation/AppBar";
import Moderatorpage from "./moderator";

function Moderator() {


  return (
    <div>
      <AppBar /> 
      <div>
        <Moderatorpage /> 
      </div>
    </div>
  );
}

export default Moderator;
