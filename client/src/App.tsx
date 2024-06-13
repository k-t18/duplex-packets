import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import "./App.css";
import useLogout from "./hooks/useLogout.ts";
import Admin from "./pages/Admin.tsx";

function App() {
  const SOCKET_SERVER_URL = "ws://localhost:5000";
  const { handleBeforeUnload } = useLogout();

  useEffect(() => {
    const socketIo = io(SOCKET_SERVER_URL);
    socketIo.on("connect", () => {
      console.log(socketIo.id);
    });

    socketIo.on("get-atoms-list", (data: any) => {
      console.log("update-atoms-list", data);
    });

    socketIo.on("get-active-users", (data: any) => {
      console.log("update-users-list", data);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "admin",
          element: <Admin />,
        },
        {
          path: "user",
          element: <h3>User infomatics</h3>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
