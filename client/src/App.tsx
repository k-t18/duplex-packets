import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

function App() {
  const SOCKET_SERVER_URL = "ws://localhost:5000";

  useEffect(() => {
    const socketIo = io(SOCKET_SERVER_URL);
    socketIo.on("connect", () => {
      console.log(socketIo.id);
    });

    socketIo.on("get-atoms-list", (data: any) => {
      console.log("update-atoms-list", data);
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
      .post("http://localhost:5000/auth/login", { email, password }, { withCredentials: true })
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
      const response = await axios.get("http://localhost:5000/auth/get-cookie", {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <div>root</div>,
      children: [{ index: true, element: <div>index</div> }],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Login />
    </div>
  );
}

export default App;
