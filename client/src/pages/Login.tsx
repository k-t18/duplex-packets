import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";

const Login: React.FC = () => {
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
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-gray-700">
            Email
          </label>
          <InputText id="username" className="w-full p-2 border border-gray-300 rounded" value={email} onChange={handleEmailChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-gray-700">
            Password
          </label>
          <InputText
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button className="w-full p-2 bg-blue-500 text-white rounded" label="Login" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;
