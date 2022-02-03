import React, { useEffect, useState } from "react";
import "../assets/styles/profile.css";
import Loader from "../components/loader";
import { Header } from "../layouts/header";

const Profile = (props) => {
  const [loggedInPOD, setloggedInPOD] = useState(
    false || sessionStorage.getItem("podStatus")
  );
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("example@healthkeeper.com");
  const [name, setName] = useState("Your Name");
  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco,dpr_1/qgwskk4vyncffxlzgs39"
  );
  const [webId, setWebId] = useState("");

  const details = {
    message: "Please wait while we configure your profile",
  };

  useEffect(() => {
    if (
      !sessionStorage.getItem("googleUserDetails") ||
      new Date().getTime() >
        JSON.parse(sessionStorage.getItem("googleUserDetails")).tokenObj
          .expires_at
    ) {
      sessionStorage.clear();
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

    if (loggedInPOD) {
      setWebId(sessionStorage.getItem("webId"));
    }
  });

  return loading ? (
    <Loader details={details}></Loader>
  ) : (
    <>
      <Header></Header>
      <div id="profileCard">
        <img id="profileImage" src={imageUrl} alt="" />
        <p id="name">{name.toUpperCase()}</p>
        <p id="email">{email}</p>
        <p id="webId">{webId}</p>
      </div>
    </>
  );
};

export default Profile;
