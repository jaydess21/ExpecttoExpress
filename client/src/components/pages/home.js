import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { Link } from "react-router-dom";
import "./style.css";

export const Home = () => {
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

  useEffect(() => {
    if (userData) {
      window.location.href = "/dashboard";
    }
  }, [userData]);

  return (
    <div className="Content">
      <p className="description">
        Our purpose is to build a community for travelers to share their
        experiences, tips, and photos from their adventures around the world. We
        believe that traveling is a way to connect with people from different
        cultures, and backgrounds.
      </p>
      <br />
      <div>
        <Link to="/signup" className="button">
          Join us
        </Link>
      </div>
    </div>
  );
};
