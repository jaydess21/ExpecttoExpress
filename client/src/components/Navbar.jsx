import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { supabase } from "../client";
import { useEffect } from "react";

export const Navbar = () => {
  // Receive isLoggedIn prop
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);

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
    <div>
      {userData ? (
        <div>
          <nav>
            <Link to="/Dashboard" className="title">
              TravelSphere
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
              <li>
                <NavLink to="/Create">Create</NavLink>
              </li>
              <li>
                <NavLink to="/gallery">Gallery</NavLink>
              </li>
              <li>
                <NavLink to="/account">Account</NavLink>
              </li>
              {/* Add more internal page links here */}
            </ul>
          </nav>
        </div>
      ) : (
        <div>
          <nav>
            <Link to="/home" className="title">
              TravelSphere
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
