import { useEffect, useState } from "react";
import { NavbarDash } from "./NavbarDash";
import { supabase } from "../../client";
import { Link, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState(null);

  const handleSignout = async () => {
    await supabase.auth.signOut();
    setUserData(null);
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("Posts")
      .select()
      .eq("authorId", userData?.id);

    setPosts(data);
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

        return <Navigate to="/dashboard" />;
      } else if (user) setUserData(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [userData]);

  if (!userData) {
    return (
      <div>
        <h1> Not logged in </h1>
      </div>
    );
  } else {
    // WHERE ALL THE POSTS FROM THIS USER WILL SHOW UP
    return (
      <div>
        {/* <NavbarDash /> */}
        <h1>Email:</h1>
        <h1>{userData?.email}</h1>
        {posts.length > 0 &&
          posts.map((post, id) => {
            return (
              <div key={id}>
                {/* Image Upload Section */}
                <h1>Title: {post.title}</h1>
                <h1> Image: </h1>
                <Link to={`/posts/${post?.id}`}>
                  <img width={200} height={200} src={post?.image} />
                </Link>
                {/* Description */}
              </div>
            );
          })}
      </div>
    );
  }
};

export default Dashboard;
