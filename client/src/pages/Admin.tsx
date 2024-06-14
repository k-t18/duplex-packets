import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useLogout from "../hooks/useLogout.ts";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState([]);
  const SOCKET_SERVER_URL = "ws://localhost:5000";
  const { handleBeforeUnload } = useLogout();

  useEffect(() => {
    async function getActiveUsers() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/active-users`, { withCredentials: true });
        setActiveUsers(response.data.message);
      } catch (error) {
        console.error(error);
      }
    }
    getActiveUsers();
  }, []);

  async function handleLogout() {
    const logout = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {}, { withCredentials: true })
      .then((res: any) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => alert("Err loging out"));
  }
  return (
    <>
      <h3>Admin Panel</h3>
      <button onClick={handleLogout}>logout</button>
    </>
    // <div>
    //   <DataTable value={activeUsers} tableStyle={{ minWidth: "50rem" }}>
    //     <Column field="firstName" header="First Name"></Column>
    //     <Column field="email" header="Email"></Column>
    //     <Column field="role" header="Role"></Column>
    //   </DataTable>
    //   <button onClick={handleBeforeUnload}>Logout</button>
    // </div>
  );
};

export default Admin;
