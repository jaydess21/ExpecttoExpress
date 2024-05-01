import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Home } from "./components/pages/home";
import { Login } from "./components/pages/login";
import { Signup } from "./components/pages/signup";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/pages/Dashboard";
import { NavbarDash } from "./components/pages/NavbarDash";
import { supabase } from "./client";
import { Navigate } from "react-router-dom";
import { Create } from "./components/pages/Create";
import { Gallery } from "./components/pages/Gallery";

import { useEffect, useState } from "react";
import { Account } from "./components/pages/Account";
import EditPost from "./components/pages/EditPost";
import Post from "./components/pages/Post";

function App() {
  const [userData, setUserData] = useState(null);
  const posts = [];

  const handleSignout = async () => {
    await supabase.auth.signOut();
    setUserData(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        handleSignout();
      } else if (user) setUserData(user);
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="App">
        <Navbar isLoggedIn={userData} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
