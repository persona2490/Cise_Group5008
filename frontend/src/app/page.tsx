"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Navbar from './components/navbar';
import AppBar from './components/AppBar';
const HomePage: React.FC = () => {
  const [name, setName] = useState("swang2077@gmail.com"); // 用'name'替换了'email'
  const [userId, setUserId] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/findUser", {
        Name: name,
      });

      if (response.data.id) {
        setUserId(response.data.id); // Set the ID to state
      } else {
        alert("User not found!");
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        alert("Can not find result");
      } else {
        alert("intnet error!");
      }
      console.error("There was a problem:", error);
    }
  };

  return (
    <div>
    <AppBar />

      <div className="container mx-auto px-4">
        <h1>Hello word</h1>
        <p>This is a content to make our page longer</p>
        <div className="w-full h-screen bg-green-300"></div>
        <p>Lorem Ipsum is simply dummy text ...</p>
      </div>
   </div>
  );
};

export default HomePage;
