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
      <div id="home">
        <p>HealthKeeper</p>
        <img id="logo" src={require("../assets/logo.png")} alt="Logo"></img>
      </div>
      <div id="buttons">
        <button id="solidSignInBtn">Sign In POD</button>
        <button id="solidSignOutBtn">Sign Out POD</button>
        <button
          id="googleSignOutBtn"
          onClick={() => {
            signOutGoogle();
          }}
        >
          Sign Out Google
        </button>

        {/* <GoogleLogout
          clientId="950311351563-mfitsq5hdbl9hlscrtsou5rilbr730ou.apps.googleusercontent.com"
          buttonText="Sign Out"
          //   onLogoutSuccess={() => signOut()}
        /> */}

        <img
          id="profile"
          src={require("../assets/profile.png")}
          alt="Profile"
        ></img>
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

export {Header, LoginHeader};
