import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";

function App() {
  const SOCKET_SERVER_URL = "ws://localhost:5000";

  useEffect(() => {
    const socketIo = io(SOCKET_SERVER_URL);
    socketIo.on("connect", () => {
      console.log(socketIo.id);
    });

    socketIo.on("message-check", (data: any) => {
      console.log(data);
    });
    socketIo.on("logout", () => {
      alert("You have been logged out");
    });
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:5000/auth/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // Perform login logic here using email and password
  };
  const checkCookie = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/get-cookie",
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      React + MySQL + Websockets App
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={checkCookie}>check get cookie</button>
    </div>
  );
}

export default App;
