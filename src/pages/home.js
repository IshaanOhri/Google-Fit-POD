import React from "react";
import GoogleLogin from "react-google-login";
import "../assets/styles/home.css";

const Home = (props) => {
  const responseGoogle = (googleUser) => {
    sessionStorage.setItem("googleUserDetails", JSON.stringify(googleUser));
    //   console.log(googleUser);
    //   console.log(JSON.parse(sessionStorage.getItem("googleUserDetails")).accessToken);
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
        // uxMode="redirect"
        // redirectUri="http://localhost:3000/dashboard"
      />
    </div>
  );
};

export default Home;
