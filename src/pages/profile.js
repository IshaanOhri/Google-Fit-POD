import React, { useEffect, useState } from "react";
import "../assets/styles/profile.css";
import Loader from "../components/loader";
import { Header } from "../layouts/header";

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

const Profile = (props) => {
  const [loggedInPOD, setloggedInPOD] = useState(
    false || sessionStorage.getItem("podStatus")
  );
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("example@healthkeeper.com");
  const [name, setName] = useState("Your Name");
  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco,dpr_1/qgwskk4vyncffxlzgs39"
  );
  const [webId, setWebId] = useState("");

  const details = {
    message: "Please wait while we configure your profile",
  };

  
  onSessionRestore((url) => {
    console.log(url);
    // window.location.href = url;
  });

  
async function readStepsFromPOD() {
  const webId = sessionStorage.getItem("webId");
  console.log(webId);

  console.log(getDefaultSession())

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

    const func = async () => {
      const session = await handleIncomingRedirect({
        url: window.location.href,
        restorePreviousSession: true,
      });
      console.log(session);
      console.log(getDefaultSession());
      console.log(fetch);
    };

    // func();


    readStepsFromPOD()
    // handleIncomingRedirect({
    //   restorePreviousSession: true,
    //   onError: (error, errorDescription) => {
    //     console.log(`${error} has occurred: `, errorDescription);
    //   },
    // }).then(async (info) => {
    //   try {
    //     const profileDocumentUrl = new URL(getDefaultSession().info.webId);
    //     const webId = profileDocumentUrl.origin;
    //     console.log(webId);
    //     sessionStorage.setItem("webId", webId);
    //     sessionStorage.setItem("podStatus", true);
    //   } catch (e) {}
    // });
  //   if (
  //     !sessionStorage.getItem("googleUserDetails") ||
  //     new Date().getTime() >
  //       JSON.parse(sessionStorage.getItem("googleUserDetails")).tokenObj
  //         .expires_at
  //   ) {
  //     sessionStorage.clear();
  //     window.location.href = "/";
  //   }

  //   const profile = JSON.parse(
  //     sessionStorage.getItem("googleUserDetails")
  //   ).profileObj;
  //   const email = profile.email;
  //   const imageUrl = profile.imageUrl;
  //   const name = profile.name;

  //   setEmail(email);
  //   setName(name);
  //   setImageUrl(imageUrl);

  //   setLoading(false);

  //   window.addEventListener("load", function (event) {
  //     if (loggedInPOD) {
  //       document.getElementById("writeToPOD").disabled = false;
  //       document.getElementById("writeToPOD").classList.remove("disabled");
  //     } else {
  //       document.getElementById("writeToPOD").disabled = true;
  //       document.getElementById("writeToPOD").className = "disabled";
  //     }
  //   });
  }, []);

  // return loading ? (
  //   <Loader details={details}></Loader>
  // ) : (
  //   <>
  //     <Header></Header>
  //     <div id="profileCard">
  //       <img id="profileImage" src={imageUrl} alt="" />
  //       <p id="name">{name.toUpperCase()}</p>
  //       <p id="email">{email}</p>
  //       <p id="webId">{webId}</p>
  //       <button
  //         id="writeToPOD"
  //         onClick={() => {
  //           alert("hey");
  //         }}
  //       >
  //         Write to POD
  //       </button>
  //     </div>
  //   </>
  // );
  

  

  
  return (<p style={{color:"white"}}>Hi</p>);
};

export default Profile;
