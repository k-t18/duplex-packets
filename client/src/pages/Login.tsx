import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Login: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-gray-700">
            Username
          </label>
          <InputText id="username" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-gray-700">
            Password
          </label>
          <InputText id="password" className="w-full p-2 border border-gray-300 rounded" type="password" />
        </div>
        <Button className="w-full p-2 bg-blue-500 text-white rounded" label="Login" />
      </div>
    </div>
  );
};

export default Login;
