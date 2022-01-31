import React, { useEffect, useState } from "react";
import "../assets/styles/profile.css";
import Loader from "../components/loader";
import { Header } from "../layouts/header";

const Profile = (props) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const details = {
    message: "Please wait while we configure your profile",
  };

  useEffect(() => {
    if (!sessionStorage.getItem("googleUserDetails")) {
      window.location.href = "/";
    }

    const profile = JSON.parse(
      sessionStorage.getItem("googleUserDetails")
    ).profileObj;
    const email = profile.email;
    const imageUrl = profile.imageUrl;
    const name = profile.name;

    setEmail(email);
    setName(name);
    setImageUrl(imageUrl);

    setLoading(false);
  }, []);

  return loading ? (
    <Loader details={details}></Loader>
  ) : (
    <>
      <Header></Header>
      <div id="profileCard">
        <img id="profileImage" src={imageUrl} alt="" />
        <p id="name">{name.toUpperCase()}</p>
        <p id="email">{email}</p>
      </div>
    </>
  );
};

export default Profile;
