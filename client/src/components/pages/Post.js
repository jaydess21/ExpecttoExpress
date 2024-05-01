import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../client";
import "./Dashboard.css";

const Post = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [post, setPost] = useState({
    authorId: "",
    author: "",
    title: "",
    description: "",
    image: "",
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    const { data } = await supabase.from("Comments").select().eq("postId", id);

    if (data) {
      setComments(data);
    }
  };

  const createComment = async () => {
    await supabase
      .from("Comments")
      .insert({
        comment: comment,
        author: userData?.email,
        postId: id,
      })
      .select();

    setComment("");
    fetchComments();
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Add comment to database
    createComment();
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .eq("id", id);
      if (data) {
        setPost({
          authorId: data[0]?.authorId,
          title: data[0]?.title,
          description: data[0]?.description,
          image: data[0]?.image,
          author: data[0]?.author,
        });
      } else {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  const handleSignout = async () => {
    await supabase.auth.signOut();
    setUserData(null);
    window.location.href = "/login";
  };

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

  useEffect(() => {
    fetchUser();
  }, [post]);

  return (
    <div className="containerP">
      <h1 className="titleEdit">Title: {post?.title}</h1>
      <img width={500} src={post?.image} alt={post?.title} />
      <h2>Description: {post?.description}</h2>
      <p>By: {post?.author}</p>
      {userData?.id === post?.authorId && (
        <Link to={`/posts/edit/${id}`}>Edit</Link>
      )}
      {/* Comment Section */}
    </div>
  );
};

export default Post;
