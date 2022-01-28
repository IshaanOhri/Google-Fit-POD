import React, { useState, useEffect } from "react";
import "../assets/styles/dashboard.css";
import { GoogleLogout } from "react-google-login";

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

import {
  login,
  logout,
  handleIncomingRedirect,
  fetch,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";

export default function Dashboard() {
  const [webId, setWebId] = useState(getDefaultSession().info.webId);
  const [issuer, setIssuer] = useState("https://inrupt.net");
  const [resource, setResource] = useState(webId);
  const [data, setData] = useState(null);
  let userURL;
  let steps = 0;

  useEffect(() => {
    if (!sessionStorage.getItem("googleUserDetails")) {
      window.location.href = "/";
    } else {
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const profilePic = document.getElementById("profilePic");

      name.innerText = JSON.parse(
        sessionStorage.getItem("googleUserDetails")
      ).profileObj.name;

      email.innerText = JSON.parse(
        sessionStorage.getItem("googleUserDetails")
      ).profileObj.email;

      profilePic.src = JSON.parse(
        sessionStorage.getItem("googleUserDetails")
      ).profileObj.imageUrl;

      const stepCount = document.getElementById("stepCount");

      if (sessionStorage.getItem("steps")) {
        steps = sessionStorage.getItem("steps");
        stepCount.innerText = steps;
      } else {
        stepCount.innerText = "N/A";
      }
    }
    handleIncomingRedirect({
      restorePreviousSession: true,
      onError: errorHandle,
    }).then(async (info) => {
      setWebId(info.webId);
      setResource(webId);

      try {
        const profileDocumentUrl = new URL(getDefaultSession().info.webId);
        userURL = profileDocumentUrl.origin;
        // console.log(userURL);

        sessionStorage.setItem("userURL", userURL);

        const webID = document.getElementById("webID");
        const podName = document.getElementById("podName");

        webID.innerText = profileDocumentUrl;
        // await readStepsFromPOD();
      } catch (e) {}
    });
  }, [webId]);

  const errorHandle = (error, errorDescription) => {
    console.log(`${error} has occured: `, errorDescription);
  };

  const loginPOD = (e) => {
    e.preventDefault();

    login({
      redirectUrl: "http://localhost:3000/dashboard",
      oidcIssuer: issuer,
      clientName: "Google Fit POD",
    });
  };

  const logoutPOD = async (e) => {
    e.preventDefault();

    const webID = document.getElementById("webID");
    const podName = document.getElementById("podName");

    webID.innerText = "";
    podName.innerText = "";

    await logout();
    setWebId(undefined);
    setData("");
    setResource("");
  };

  function signOut() {
    sessionStorage.clear();
    window.location.href = "/";
  }

  function getStepCount(e) {
    e.preventDefault();
    const stepCount = document.getElementById("stepCount");

    stepCount.innerText = "Loading...";

    var bearerToken = JSON.parse(
      sessionStorage.getItem("googleUserDetails")
    ).accessToken;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + bearerToken);
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("access-control-allow-origin", "*");

    let todayMilliSeconds = new Date();
    todayMilliSeconds.setUTCHours(0, 0, 0, 0);
    todayMilliSeconds = todayMilliSeconds - 19800000;

    var raw = JSON.stringify({
      aggregateBy: [
        {
          dataTypeName: "com.google.step_count.delta",
          dataSourceId:
            "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
        },
      ],
      bucketByTime: {
        durationMillis: 86400000,
      },
      startTimeMillis: todayMilliSeconds,
      endTimeMillis: todayMilliSeconds + 86400000,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        steps = result.bucket[0].dataset[0].point[0].value[0].intVal;
        // console.log(steps);
        sessionStorage.setItem("steps", steps);
        stepCount.innerText = steps;
      })
      .catch((error) => {
        console.log(error);
        steps = sessionStorage.getItem("steps");
        stepCount.innerText = steps;
      });
  }

  async function writeStepsToPOD() {
    var stepsSolidDataset = createSolidDataset();

    userURL = sessionStorage.getItem("userURL");
    steps = sessionStorage.getItem("steps");

    const newStep = buildThing(createThing({ name: "steps" }))
      .addInteger("https://schema.org/Integer", steps)
      .build();

    stepsSolidDataset = setThing(stepsSolidDataset, newStep);

    try {
      await saveSolidDatasetAt(
        `${userURL}/daily-steps/${new Date()
          .toDateString()
          .split(" ")
          .join("-")}`,
        stepsSolidDataset,
        { fetch: getDefaultSession().fetch }
      );

      await readStepsFromPOD();
    } catch (error) {
      console.log(error);
    }
  }

  async function readStepsFromPOD() {
    const stepCountPod = document.getElementById("stepCountPod");

    userURL = sessionStorage.getItem("userURL");

    const myDataset = await getSolidDataset(
      `${userURL}/daily-steps/${new Date()
        .toDateString()
        .split(" ")
        .join("-")}`,
      { fetch: getDefaultSession().fetch }
    );

    const profile = getThing(
      myDataset,
      `${userURL}/daily-steps/${new Date()
        .toDateString()
        .split(" ")
        .join("-")}#steps`
    );

    stepCountPod.innerText = getInteger(profile, "https://schema.org/Integer");
    // console.log(getInteger(profile, "https://schema.org/Integer"));
  }

  return (
    <>
      <div id="podBtns">
        <button id="solidLoginBtn" onClick={(e) => loginPOD(e)}>
          Login POD
        </button>

        <button id="solidLogoutBtn" onClick={(e) => logoutPOD(e)}>
          Logout POD
        </button>
      </div>

      <div id="signOutBtn">
        <GoogleLogout
          clientId="950311351563-mfitsq5hdbl9hlscrtsou5rilbr730ou.apps.googleusercontent.com"
          buttonText="Sign Out"
          onLogoutSuccess={() => signOut()}
        />
      </div>

      <div id="stepsBlock">
        <div>
          <img id="profilePic" src="" alt="" />
          <p id="name"></p>
          <p id="email"></p>
        </div>

        <div>
          <p id="webID"></p>
          <p id="podName"></p>
        </div>

        <p>Current step count:</p>
        <p id="stepCount">N/A</p>
        <p>Data in POD:</p>
        <p id="stepCountPod">N/A</p>
        <div>
          <button id="refreshStepCount" onClick={(e) => getStepCount(e)}>
            Refresh
          </button>
          <button id="writeToPODBtn" onClick={() => writeStepsToPOD()}>
            Write to POD
          </button>
        </div>
      </div>
    </>
  );
}
