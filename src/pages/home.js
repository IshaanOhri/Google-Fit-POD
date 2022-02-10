/*
 * @Author: Ishaan Ohri
 * @Date: 2022-01-28 10:37:37
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2022-01-31 23:37:48
 * @Description: First page of the project. Contains a Google Sign In button. Google Sign In button will first complete the Google Authentication and then the Inrupt Authentication. After the authentications, it will call the Google APIs, write data to POD, read it back from the POD and store it in the session storage, after which user is redirected to /dashboard
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
  getDecimal,
} from "@inrupt/solid-client";
import {
  login,
  handleIncomingRedirect,
  fetch,
  getDefaultSession,
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

  // Function to use data received from Google API and write into POD
  async function writeDataToPOD(webId, dates, userData) {
    const {
      steps,
      distance,
      activeMinutes,
      calories,
      heartRate,
      heartPoints,
      sleepDuration,
      speed,
    } = userData;

    for (var i = 0; i < 7; i++) {
      var solidDataset = createSolidDataset();
      const stepsThing = buildThing(createThing({ name: "steps" }))
        .addInteger("https://schema.org/Integer", steps[i])
        .build();

      const distanceThing = buildThing(createThing({ name: "distance" }))
        .addDecimal("https://schema.org/Float", distance[i])
        .build();

      const activeMinutesThing = buildThing(
        createThing({ name: "activeMinutes" })
      )
        .addInteger("https://schema.org/Integer", activeMinutes[i])
        .build();

      const caloriesThing = buildThing(createThing({ name: "calories" }))
        .addInteger("https://schema.org/Integer", calories[i])
        .build();

      const heartRateThing = buildThing(createThing({ name: "heartRate" }))
        .addInteger("https://schema.org/Integer", heartRate[i])
        .build();

      const heartPointsThing = buildThing(createThing({ name: "heartPoints" }))
        .addInteger("https://schema.org/Integer", heartPoints[i])
        .build();

      const sleepDurationThing = buildThing(
        createThing({ name: "sleepDuration" })
      )
        .addInteger("https://schema.org/Integer", 0)
        .build();

      const speedThing = buildThing(createThing({ name: "speed" }))
        .addDecimal("https://schema.org/Float", speed[i])
        .build();

      solidDataset = setThing(solidDataset, stepsThing);
      solidDataset = setThing(solidDataset, distanceThing);
      solidDataset = setThing(solidDataset, activeMinutesThing);
      solidDataset = setThing(solidDataset, caloriesThing);
      solidDataset = setThing(solidDataset, heartRateThing);
      solidDataset = setThing(solidDataset, heartPointsThing);
      solidDataset = setThing(solidDataset, sleepDurationThing);
      solidDataset = setThing(solidDataset, speedThing);

      try {
        await saveSolidDatasetAt(
          `${webId}/google-fit-pod/${dates[i]}`,
          solidDataset,
          { fetch: fetch }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Function to read data from POD and store to session storage
  async function readDataFromPOD(webId, dates) {
    const steps = [],
      distance = [],
      activeMinutes = [],
      calories = [],
      heartRate = [],
      heartPoints = [],
      sleepDuration = [],
      speed = [];

    for (var i = 0; i < 7; i++) {
      const solidDataset = await getSolidDataset(
        `${webId}/google-fit-pod/${dates[i]}`,
        { fetch: getDefaultSession().fetch }
      );

      const stepsThing = getThing(
        solidDataset,
        `${webId}/google-fit-pod/${dates[i]}#steps`
      );

      const distanceThing = getThing(
        solidDataset,
        `${webId}/google-fit-pod/${dates[i]}#distance`
      );

      const activeMinutesThing = getThing(
        solidDataset,
        `${webId}/google-fit-pod/${dates[i]}#activeMinutes`
      );

      const caloriesThing = getThing(
        solidDataset,
        `${webId}/google-fit-pod/${dates[i]}#calories`
      );

      const heartRateThing = getThing(
        solidDataset,
        `${webId}/google-fit-pod/${dates[i]}#heartRate`
      );

      const heartPointsThing = getThing(
        solidDataset,
        `${webId}/google-fit-pod/${dates[i]}#heartPoints`
      );

      const sleepDurationThing = getThing(
        solidDataset,
        `${webId}/google-fit-pod/${dates[i]}#sleepDuration`
      );

      const speedThing = getThing(
        solidDataset,
        `${webId}/google-fit-pod/${dates[i]}#speed`
      );

      steps.push(getInteger(stepsThing, "https://schema.org/Integer"));
      distance.push(getDecimal(distanceThing, "https://schema.org/Float"));
      activeMinutes.push(
        getInteger(activeMinutesThing, "https://schema.org/Integer")
      );
      calories.push(getInteger(caloriesThing, "https://schema.org/Integer"));
      heartRate.push(getInteger(heartRateThing, "https://schema.org/Integer"));
      heartPoints.push(
        getInteger(heartPointsThing, "https://schema.org/Integer")
      );
      sleepDuration.push(
        getInteger(sleepDurationThing, "https://schema.org/Integer")
      );
      speed.push(getDecimal(speedThing, "https://schema.org/Float"));
    }

    // Add everything to sessions storage
    sessionStorage.setItem("steps", JSON.stringify(steps));
    sessionStorage.setItem("distance", JSON.stringify(distance));
    sessionStorage.setItem("activeMinutes", JSON.stringify(activeMinutes));
    sessionStorage.setItem("caloriesExpended", JSON.stringify(calories));
    sessionStorage.setItem("heartRate", JSON.stringify(heartRate));
    sessionStorage.setItem("heartPoints", JSON.stringify(heartPoints));
    sessionStorage.setItem("sleepDuration", JSON.stringify(sleepDuration));
    sessionStorage.setItem("speed", JSON.stringify(speed));
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let code = params.has("code");
    let state = params.has("state");

    if (
      sessionStorage.getItem("googleUserDetails") &&
      sessionStorage.getItem("podStatus") &&
      code &&
      state
    ) {
      // Start loader
      setLoading(true);

      const { startTime, endTime, dates, datesForPOD } = calculateDates();

      // Get bearerToken from session storage
      const bearerToken = JSON.parse(
        sessionStorage.getItem("googleUserDetails")
      ).accessToken;

      // Get webId from session storage
      const webId = sessionStorage.getItem("webId");

      // Function to get data from google API, write to POD, read from POD and store in session storage
      async function fetchAndSaveData() {
        const steps = await getStepCount(
          bearerToken,
          startTime,
          endTime,
          86400000
        );
        const distance = await getDistance(
          bearerToken,
          startTime,
          endTime,
          86400000
        );
        const activeMinutes = await getActiveMinutes(
          bearerToken,
          startTime,
          endTime,
          86400000
        );
        const calories = await getCaloriesExpended(
          bearerToken,
          startTime,
          endTime,
          86400000
        );
        const heartRate = await getHeartRate(
          bearerToken,
          startTime,
          endTime,
          86400000
        );
        const heartPoints = await getHeartPoints(
          bearerToken,
          startTime,
          endTime,
          86400000
        );
        const sleepDuration = await getSleepDuration(
          bearerToken,
          startTime,
          endTime,
          86400000
        );
        const speed = await getSpeed(bearerToken, startTime, endTime, 86400000);

        // Create object for user data with data received from google API
        const userData = {
          speed,
          distance,
          activeMinutes,
          calories,
          heartPoints,
          heartRate,
          sleepDuration,
          steps,
        };

        console.log(userData);

        // Write data to POD date wise
        await writeDataToPOD(webId, datesForPOD, userData);

        // Read data from POD date wise
        await readDataFromPOD(webId, datesForPOD);

        window.location.href = "/dashboard";
        // End loader
        setLoading(false);
      }

      fetchAndSaveData();
    }
  }, []);

  // Function which is called after successful Google Login
  // Initiates the Inrupt Login after completion of Google Login
  const responseGoogle = (googleUser) => {
    console.log(googleUser);
    sessionStorage.setItem("googleUserDetails", JSON.stringify(googleUser));
    signInPOD();
    // window.location.href = "/dashboard";
  };

  // Function to handle incoming redirects
  // Catches the data sent from the Inrupt client and stores it in local storage
  handleIncomingRedirect({
    url: window.location.href,
    restorePreviousSession: true,
  });

  // Function which is called after the login process of inrupt is completed
  // Stores `webId` into session storage
  // Sets `podStatus` to `true` in the session storage
  onLogin(() => {
    const profileDocumentUrl = new URL(getDefaultSession().info.webId);
    const webId = profileDocumentUrl.origin;

    sessionStorage.setItem("webId", webId);
    sessionStorage.setItem("podStatus", true);
    window.location.href = "/";
  });

  // Function definition for signing into POD
  // Initiates the Inrupt login process with the POD provider
  const signInPOD = () => {
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
          className="check"
          clientId="950311351563-ehj50jsqhnacs05u8m45lrlravs56982.apps.googleusercontent.com"
          buttonText="Sign In"
          onSuccess={responseGoogle}
          onFailure={() => {
            console.log("Google error");
          }}
          cookiePolicy={"single_host_origin"}
          theme="dark"
          scope="https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.sleep.read"
        />
      </div>
    </>
  );
};

export default Home;
