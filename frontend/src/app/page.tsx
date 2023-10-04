"use client"
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const HomePage: React.FC = () => {
  const [name, setName] = useState('swang2077@gmail.com'); // 用'name'替换了'email'
  const [userId, setUserId] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/findUser', { Name: name }); // 注意这里发送请求的键是'Name'

      if (response.data.id) {
        setUserId(response.data.id);  // Set the ID to state
      } else {
        alert('User not found!');
      }
    } catch (error) {
      const axiosError = error as AxiosError; // 类型断言

    if (axiosError.response && axiosError.response.status === 404) {
        alert('查找失败！');
    } else {
        alert('网络有问题！');
    }
    console.error('There was a problem:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} // 这里是'setName'
      />
      <button onClick={handleSubmit}>Find User ID</button>
      {userId && <div>User ID: {userId}</div>}
    </div>
  );
};

export default HomePage;
