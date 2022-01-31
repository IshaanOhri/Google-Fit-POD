/*
 * @Author: Ishaan Ohri
 * @Date: 2022-01-28 10:37:37
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2022-01-31 21:49:55
 * @Description: First page of the project. Contains a Google Sign In button. After successful sign in user is redirected to /dashboard
 */
import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import "../assets/styles/home.css";
import { LoginHeader } from "../layouts/header";

const Home = (props) => {
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
  });

  const responseGoogle = (googleUser) => {
    sessionStorage.setItem("googleUserDetails", JSON.stringify(googleUser));
    window.location.href = "/dashboard";
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
      </div>
    </>
  );
};

export default Home;
