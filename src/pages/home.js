/*
 * @Author: Ishaan Ohri
 * @Date: 2022-01-28 10:37:37
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2022-01-31 23:37:48
 * @Description: First page of the project. Contains a Google Sign In button. After successful sign in user is redirected to /dashboard
 */
import React, { useEffect } from "react";
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
} from "@inrupt/solid-client-authn-browser";

const Home = (props) => {
  onSessionRestore((url) => {
    console.log(url);
    // window.location.href = url;
  });

  
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
    if (sessionStorage.getItem("googleUserDetails")) {
      window.location.href = "/dashboard";
    }

    // Promise based function to handle login redirect
    handleIncomingRedirect({
      restorePreviousSession: true,
      onError: (error, errorDescription) => {
        console.log(`${error} has occurred: `, errorDescription);
      },
    }).then(async (info) => {
      try {
        const profileDocumentUrl = new URL(getDefaultSession().info.webId);
        const webId = profileDocumentUrl.origin;

        console.log(getDefaultSession());
        console.log(webId);
        sessionStorage.setItem("webId", webId);
        sessionStorage.setItem("podStatus", true);

        const session = getDefaultSession();
        console.log(session.info.isLoggedIn);
        readStepsFromPOD()
      } catch (e) {}
    });
  });

  const responseGoogle = (googleUser) => {
    sessionStorage.setItem("googleUserDetails", JSON.stringify(googleUser));
    window.location.href = "/dashboard";
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

  return (
    <>
      <LoginHeader></LoginHeader>
      <div id="googleSignInBtn">
        <GoogleLogin
          clientId="950311351563-mfitsq5hdbl9hlscrtsou5rilbr730ou.apps.googleusercontent.com"
          buttonText="Sign In"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          theme="dark"
          scope="https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.sleep.read"
        />

        <p
          id="solidSignInBtn"
          style={{ color: "white" }}
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
