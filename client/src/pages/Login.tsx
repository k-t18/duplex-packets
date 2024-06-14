import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import useLogout from "../hooks/useLogout.ts";

type FormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { handleBeforeUnload } = useLogout();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          ...data,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", response.data.role);
        // navigate("/");
        if (response.data.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    setFocus("email");
  }, []);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-96 h-auto p-8 rounded shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 text-gray-700">
              Email
            </label>
            <InputText
              type="text"
              id="email"
              className="p-inputtext-lg w-full p-2 border border-gray-300 rounded"
              {...register("email", { required: true })}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-gray-700">
              Password
            </label>
            <InputText
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum length should be 8 characters" },
              })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <Button className="w-full p-2 bg-blue-500 text-white rounded" label="Login" type="submit" />
        </form>
      </div>
      <button onClick={handleBeforeUnload}>Logout</button>
    </div>
  );
};

export default Login;
