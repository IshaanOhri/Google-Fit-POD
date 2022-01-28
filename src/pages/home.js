/*
 * @Author: Ishaan Ohri 
 * @Date: 2022-01-28 10:37:37 
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2022-01-28 12:14:38
 * @Description: First page of the project. Contains a Google Sign In button. After successful sign in user is redirected to /dashboard
 */
import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import "../assets/styles/home.css";

const Home = (props) => {

  useEffect(() => {
    if(sessionStorage.getItem("googleUserDetails")){
    window.location.href = "/dashboard";
    }
  })

  const responseGoogle = (googleUser) => {
    sessionStorage.setItem("googleUserDetails", JSON.stringify(googleUser));
    window.location.href = "/dashboard";
  };

  return (
    <div id="signInBtn">
      <GoogleLogin
        clientId=""
        buttonText="Sign In"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Home;
