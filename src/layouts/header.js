import React from "react";
import "../assets/styles/header.css";
import { logout } from "@inrupt/solid-client-authn-browser";

// Logout of POD, clear session storage and redirect to home after logout
const signOut = async () => {
  await logout();
  sessionStorage.clear();
  window.location.href = "/";
};

// Header for all pages other than home page
// Header contains Home, Sign In POD, Sign Out POD, Sign Out Google and Profile
const Header = (pops) => {
  return (
    // Header main div
    <div className="header noselect">
      {/* Home div */}
      <div
        id="home"
        onClick={() => {
          window.location.href = "/dashboard";
        }}
      >
        <p>HealthKeeper</p>
        <img id="logo" src={require("../assets/logo.png")} alt="Logo"></img>
      </div>

      {/* Buttons div */}
      <div id="buttons">
        <p
          id="signOutBtn"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </p>
        {/* Profile button */}
        <img
          id="profile"
          src={require("../assets/profile.png")}
          alt="Profile"
          onMouseOver={(e) =>
            (e.currentTarget.src = require("../assets/profile-hover.png"))
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = require("../assets/profile.png"))
          }
          onClick={() => {
            window.location = "/profile";
          }}
        />
      </div>
    </div>
  );
};

// Header on the home page
const LoginHeader = (pops) => {
  return (
    // Header main div
    <div className="loginHeader">
      {/* Home div */}
      <div id="home" className="tracking-in-expand">
        <p>HealthKeeper</p>
        <img id="logo" src={require("../assets/logo.png")} alt="Logo"></img>
      </div>
    </div>
  );
};

export { Header, LoginHeader };
