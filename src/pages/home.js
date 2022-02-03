/*
 * @Author: Ishaan Ohri
 * @Date: 2022-01-28 10:37:37
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2022-01-31 23:37:48
 * @Description: First page of the project. Contains a Google Sign In button. After successful sign in user is redirected to /dashboard
 */
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import "../assets/styles/home.css";
import { LoginHeader } from "../layouts/header";

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
  onSessionRestore,
  onLogin,
} from "@inrupt/solid-client-authn-browser";
import Loader from "../components/loader";
import { calculateDates } from "../utils/date";
import {
  getActiveMinutes,
  getCaloriesExpended,
  getDistance,
  getHeartPoints,
  getHeartRate,
  getSleepDuration,
  getSpeed,
  getStepCount,
} from "../utils/googleapis";

const Home = (props) => {
  const [loading, setLoading] = useState(false);

  const details = {
    message: "Please wait while we configure your dashboard",
  };

  async function readStepsFromPOD() {
    const webId = sessionStorage.getItem("webId");
    // console.log(webId);

    const myDataset = await getSolidDataset(
      `${webId}/daily-steps/Mon-Jan-24-2022`,
      { fetch: getDefaultSession().fetch }
    );

    const profile = getThing(
      myDataset,
      `${webId}/daily-steps/Mon-Jan-24-2022#steps`
    );

    console.log(getInteger(profile, "https://schema.org/Integer"));
    // console.log(getInteger(profile, "https://schema.org/Integer"));
  }

  useEffect(() => {
    if (
      sessionStorage.getItem("googleUserDetails") &&
      sessionStorage.getItem("podStatus")
    ) {
      setLoading(true);
      // TO-DO
      // Fetch Data and forward to /dashboard
      console.log("Both login");

      const { startTime, endTime, dates } = calculateDates();

      const bearerToken = JSON.parse(
        sessionStorage.getItem("googleUserDetails")
      ).accessToken;

      console.log(bearerToken)

      async function fetchData() {
        await getStepCount(bearerToken, startTime, endTime, 86400000);
        await getDistance(bearerToken, startTime, endTime, 86400000);
        await getActiveMinutes(bearerToken, startTime, endTime, 86400000);
        await getCaloriesExpended(bearerToken, startTime, endTime, 86400000);
        await getHeartRate(bearerToken, startTime, endTime, 86400000);
        await getHeartPoints(bearerToken, startTime, endTime, 86400000);
        await getSleepDuration(bearerToken, startTime, endTime, 86400000);
        await getSpeed(bearerToken, startTime, endTime, 86400000);

        window.location.href = "/dashboard";
        setLoading(false);
      }

      fetchData();
    }

    const func = async () => {
      const session = await handleIncomingRedirect({
        url: window.location.href,
        restorePreviousSession: true,
      });

      if (session.isLoggedIn) {
        const profileDocumentUrl = new URL(session.webId);
        const webId = profileDocumentUrl.origin;

        console.log(webId);
        sessionStorage.setItem("webId", webId);
        sessionStorage.setItem("podStatus", true);
        window.location.href = "/";
      }
    };

    func();
  },[]);

  const responseGoogle = (googleUser) => {
    sessionStorage.setItem("googleUserDetails", JSON.stringify(googleUser));
    console.log("Google Sign In Successful");
    // window.location.href = "/dashboard";
  };

  // Function definition for signing into POD
  const signInPOD = (e) => {
    e.preventDefault();

    login({
      redirectUrl: window.location.href,
      oidcIssuer: "https://inrupt.net",
      clientName: "Google Fit POD",
    });
  };

  return loading ? (
    <Loader details={details}></Loader>
  ) : (
    <>
      <LoginHeader></LoginHeader>
      <div id="signInBtn">
        <GoogleLogin
          clientId="950311351563-mfitsq5hdbl9hlscrtsou5rilbr730ou.apps.googleusercontent.com"
          buttonText="Sign In"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
          theme="dark"
          scope="https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.sleep.read"
        />

        <p
          id="solidSignInBtn"
          onClick={(e) => {
            signInPOD(e);
            // console.log('hi')
          }}
        >
          Sign In POD
        </p>
      </div>
    </>
  );
};

export default Home;
