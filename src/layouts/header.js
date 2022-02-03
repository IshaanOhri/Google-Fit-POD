import React, { useEffect, useState } from "react";
import "../assets/styles/header.css";
import {
  login,
  logout,
  handleIncomingRedirect,
  fetch,
  getDefaultSession,
  onSessionRestore,
} from "@inrupt/solid-client-authn-browser";
import {
  getSolidDataset,
  getThing,
  setThing,
  buildThing,
  createThing,
  saveSolidDatasetAt,
  createSolidDataset,
  getInteger,
} from "@inrupt/solid-client";

// Logout of POD, clear session storage and redirect to home after logout
const signOutGoogle = async () => {
  await logout();
  sessionStorage.clear();
  window.location.href = "/";
};


// Function definition for signing out of POD
const signOutPOD = async (e) => {
  e.preventDefault();

  await logout();
  sessionStorage.removeItem("webId");
};


// Header for all pages other than home page
// Header contains Home, Sign In POD, Sign Out POD, Sign Out Google and Profile
const Header = (pops) => {
  const [loggedInPOD, setloggedInPOD] = useState(
    false || sessionStorage.getItem("podStatus")
  );
  const [webId, setWebId] = useState(getDefaultSession().info.webId);
  const [resource, setResource] = useState(webId);

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
        <p
          id="solidSignInBtn"
          onClick={(e) => {
            // signInPOD(e);
          }}
        >
          Sign In POD
        </p>
        {/* POD Sign Out button */}
        <p
          id="solidSignOutBtn"
          onClick={(e) => {
            signOutPOD(e);
          }}
        >
          Sign Out POD
        </p>
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
