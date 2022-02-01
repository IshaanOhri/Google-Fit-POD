import React, { useEffect, useState } from "react";
import "../assets/styles/header.css";

// Clear session storage and redirect to home after logout
const signOutGoogle = () => {
  sessionStorage.clear();
  window.location.href = "/";
};

// Header for all pages other than home page
// Header contains Home, Sign In POD, Sign Out POD, Sign Out Google and Profile
const Header = (pops) => {
  const [loggedInPOD, setloggedInPOD] = useState(false || sessionStorage.getItem("podStatus"));

  useEffect(() => {
    if (loggedInPOD) {
      document.getElementById("solidSignInBtn").style.display = "none";
      document.getElementById("solidSignOutBtn").style.display = "block";
    } else {
      document.getElementById("solidSignInBtn").style.display = "block";
      document.getElementById("solidSignOutBtn").style.display = "none";
    }
  });

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
        {/* POD Sign In button */}
        <p id="solidSignInBtn">Sign In POD</p>
        {/* POD Sign Out button */}
        <p id="solidSignOutBtn">Sign Out POD</p>
        {/* Google Sign Out button */}
        <p
          id="googleSignOutBtn"
          onClick={() => {
            signOutGoogle();
          }}
        >
          Sign Out Google
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
