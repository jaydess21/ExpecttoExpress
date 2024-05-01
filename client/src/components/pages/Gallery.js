import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { Navigate } from "react-router-dom";
import "./Dashboard.css";

export const Gallery = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");
  const [searchBy, setSearchBy] = useState("");
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState(null);

  const fetchPosts = async () => {
    const { data } = await supabase.from("Posts").select().order(orderBy, {
      ascending: false,
    });

    setFilteredPosts(data);
    setPosts(data);
  };

  const handleSignout = async () => {
    await supabase.auth.signOut();
    setUserData(null);
  };
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Logic for adding comment to comments array
    setComments([...comments, comment]);
    setComment("");
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
        return <Navigate to="/home" />;
      } else if (user) {
        setUserData(user);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [userData]);

  // UPDATE post
  const updatePost = async (likes, id) => {
    await supabase
      .from("Posts")
      .update({
        likes: likes,
      })
      .eq("id", id);
  };

  useEffect(() => {
    if (searchBy.length !== "") {
      const newFilteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchBy.toLowerCase())
      );
      setFilteredPosts(newFilteredPosts);
    }
  }, [searchBy]);

  useEffect(() => {
    fetchPosts();
  }, [orderBy]);

  return (
    // WHERE ALL THE POSTS FROM ALL USERS SHOW UP
    <div>
      <h1> Posts </h1>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by title"
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value)}
      />
      {/* ORDER BY */}
      <div>
        <button
          style={{
            backgroundColor: `${orderBy === "created_at" ? "green" : "black"}`,
          }}
          onClick={(e) => setOrderBy("created_at")}
        >
          Newest
        </button>
        <button
          style={{
            backgroundColor: `${orderBy === "likes" ? "green" : "black"}`,
          }}
          onClick={(e) => setOrderBy("likes")}
        >
          Most Liked
        </button>
      </div>
      {filteredPosts &&
        filteredPosts?.map((post) => (
          <div className="containerP" key={post.id}>
            <h2>{post?.title}</h2>
            <img width={500} src={post.image} />
            <h4>{post?.description}</h4>
            <p>By: {post?.author}</p>
            <div>
              <h3>Likes: {post?.likes}</h3>
              <button onClick={(e) => updatePost(post?.likes + 1, post?.id)}>
                <img src="like-button.png" alt="Button" />
              </button>
              {/* Comment Box */}
            </div>
            <div>
              {/* Form for leaving a comment */}
              <form onSubmit={(e) => handleSubmitComment(e, post.id)}>
                <textarea
                  placeholder="Leave a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button type="submit">Submit</button>
              </form>
              {/* Display existing comments */}
              <div>
                {comments.map((comment, index) => (
                  <div key={index}>
                    <p>{comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
