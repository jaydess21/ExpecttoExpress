import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { supabase } from "../../client";
import { v4 as uuidv4 } from "uuid";

export const Create = () => {
  const [userData, setUserData] = useState(null);
  const [randomID, setRandomID] = useState(uuidv4());
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  async function uploadImage(e) {
    let file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("Posts-Images")
      .upload(userData?.id + `/${randomID}`, file, {
        upsert: false,
      });

    if (data) {
      getMedia();
    } else {
      console.log(error);
    }
  }

  async function getMedia() {
    const { data, error } = await supabase.storage
      .from("Posts-Images")
      .list(userData?.id + "/", {
        limit: 30,
        offset: 0,
        sortBy: {
          column: "name",
          order: "asc",
        },
      });

    if (data) {
      console.log(data);
      var currentMedia = data.find((media) => media.name === randomID);
      setMedia(currentMedia || { name: "ERROR" });
    } else {
      console.log(71, error);
    }
  }

  const createPost = async (event) => {
    event.preventDefault();
    await supabase
      .from("Posts")
      .insert({
        title: title,
        description: description,
        author: userData?.email,
        authorId: userData?.id,
        likes: 0,
        image: `https://qgscsdcwesvbsrmfjlft.supabase.co/storage/v1/object/public/Posts-Images/${userData?.id}/${media?.name}`,
      })
      .select();

    setTitle("");
    setDescription("");
    window.location = "/dashboard";
  };

  return (
    <form onSubmit={createPost}>
      <div className="loginDiv" id="loginDiv">
        <h1>Create a post </h1>
        <div className="inputField">
          <input
            type="text"
            required
            aria-invalid="false"
            value={title}
            onChange={handleTitleChange}
          />
          <label>Title </label>
        </div>
        <div className="inputField">
          <input
            type="text"
            required
            aria-invalid="false"
            value={description}
            onChange={handleDescriptionChange}
          />
          <label>Description</label>
        </div>
        <div>
          {/* <label>Photo:</label> */}
          {title && (
            <input
              className="file"
              type="file"
              onChange={(e) => uploadImage(e)}
              required
            />
          )}
        </div>

        <button type="submit" className="login" onClick={createPost}>
          Save
        </button>
      </div>
    </form>
  );
};
