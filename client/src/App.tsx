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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Prepare the data to send
      const url = "http://localhost:5000/auth/logout";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({}); // Include any data you need to send

      // Create a Blob with the data
      const blob = new Blob([body], { type: "application/json" });

      // Use sendBeacon to send the data
      navigator.sendBeacon(url, blob);
    };
    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
  }, []);
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
