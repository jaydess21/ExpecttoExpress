import React from "react";
import "./style.css";
import { supabase } from "../../client";
import { useState } from "react";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert(
        "Sign-up successful! Please check your email to verify your account."
      );
      return (window.location.href = "/account");
    }
  };
  return (
    <form onSubmit={handleSignUp}>
      <div className="loginDiv" id="loginDiv">
        <h1>Registration</h1>
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

        <button id="login" className="login">
          Signup
        </button>
      </div>
    </form>
  );
};
