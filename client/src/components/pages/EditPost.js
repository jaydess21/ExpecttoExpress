import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../client";
import "./EditPost.css";

const EditPost = ({ data }) => {
  const [userData, setUserData] = useState(null);
  const [randomID, setRandomID] = useState(uuidv4());
  const { id } = useParams();
  const [post, setPost] = useState({
    authorId: "",
    title: "",
    description: "",
    image: "",
  });

  const handleSignout = async () => {
    await supabase.auth.signOut();
    setUserData(null);
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
        });
      } else {
        console.log(error);
      }
    };

    fetchPost();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [post]);

  // UPDATE post
  const updatePost = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .update({
        title: post.title,
        description: post.description,
        image: post.image,
      })
      .eq("id", id);

    window.location = "/Dashboard";
  };

  async function uploadImage(e) {
    let file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("Posts-Images")
      .upload(userData?.id + `/${randomID}`, file, {
        upsert: false,
      });

    if (data) {
      setPost((prev) => {
        return {
          ...prev,
          image: `https://qgscsdcwesvbsrmfjlft.supabase.co/storage/v1/object/public/Posts-Images/${userData?.id}/${randomID}`,
        };
      });
    } else {
      console.log(error);
    }
  }

  // DELETE post
  const deletePost = async (event) => {
    event.preventDefault();

    await supabase.from("Posts").delete().eq("id", id);

    window.location = "/Dashboard";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="form">
      <form>
        <label for="titleEdit">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label for="description">Description</label>
        <br />
        <input
          type="text"
          id="description"
          name="description"
          value={post.description}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          className="file"
          type="file"
          onChange={(e) => uploadImage(e)}
          required
        />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            className="updateButton"
            type="submit"
            value="Submit"
            onClick={updatePost}
          />
          <button className="deleteButton" onClick={deletePost}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
