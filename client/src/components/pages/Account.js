import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { NavLink } from "react-router-dom";

export const Account = () => {
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
      <h1>Email: {userData?.email}</h1>
      <button>
        <NavLink to="/home" onClick={handleSignout}>
          Logout
        </NavLink>
      </button>
    </div>
  );
};
