import React from "react";
import "../assets/styles/header.css";
import { GoogleLogout } from "react-google-login";

const signOutGoogle = () => {
  sessionStorage.clear();
  window.location.href = "/";
};

const Header = (pops) => {
  return (
    <div className="header noselect">
      <div
        id="home"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        <p>HealthKeeper</p>
        <img id="logo" src={require("../assets/logo.png")} alt="Logo"></img>
      </div>
      <div id="buttons">
        <p id="solidSignInBtn">Sign In POD</p>
        <p id="solidSignOutBtn">Sign Out POD</p>
        <p
          id="googleSignOutBtn"
          onClick={() => {
            signOutGoogle();
          }}
        >
          Sign Out Google
        </p>

        <img
          id="profile"
          src={require("../assets/profile.png")}
          alt="Profile"
          onMouseOver={(e) => e.currentTarget.src=require("../assets/profile-hover.png")}
          onMouseOut={(e) => e.currentTarget.src=require("../assets/profile.png")}
          onClick={() => {
            window.location = "/profile";
          }}
        />
      </div>
    </div>
  );
};

const LoginHeader = (pops) => {
  return (
    <div className="loginHeader">
      <div id="home">
        <p>HealthKeeper</p>
        <img id="logo" src={require("../assets/logo.png")} alt="Logo"></img>
      </div>
    </div>
  );
};

export { Header, LoginHeader };
