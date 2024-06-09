import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Admin = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const SOCKET_SERVER_URL = "ws://localhost:5000";

  useEffect(() => {
    const socketIo = io(SOCKET_SERVER_URL);
    socketIo.on("connect", () => {
      console.log(socketIo.id);
    });

    // async function getActiveUsers() {
    //   try {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/active-users`);
    //     setActiveUsers(response.data.message);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    // getActiveUsers();

    socketIo.on("get-active-users", (data: any) => {
      console.log("update-users-list", data);
    });
  }, []);
  return (
    <div>
      <DataTable value={activeUsers} tableStyle={{ minWidth: "50rem" }}>
        <Column field="firstName" header="First Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="role" header="Role"></Column>
      </DataTable>
    </div>
  );
};

export default Admin;
