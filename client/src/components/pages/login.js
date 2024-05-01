import React from "react";
import "./style.css";
import { supabase } from "../../client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Logged in successfully!");
      navigate("/dashboard"); // Redirect to the Dashboard page
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="loginDiv" id="loginDiv">
        <h1>Login</h1>
        <div className="inputField">
          <input
            type="text"
            id="email"
            required
            aria-invalid="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email </label>
        </div>
        <div className="inputField">
          <input
            type="password"
            id="password"
            required
            aria-invalid="false"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <div
          className="error"
          aria-errormessage="Invalid username or password."
          id="error"
        ></div>
        {/* <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide Password" : "Show Password"}
        </button> */}
        <button type="submit" className="login">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
