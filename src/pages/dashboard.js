import React, { useState, useEffect } from "react";
import "../assets/styles/dashboard.css";
import { GoogleLogout } from "react-google-login";
import {
  getActiveMinutes,
  getCaloriesExpended,
  getDistance,
  getHeartMinutes,
  getSleepSegment,
  getSpeed,
  getStepCount,
} from "../utils/googleapis";

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
import { render } from "@testing-library/react";
import Loader from "../components/loader";
import { calculateDates } from "../utils/date";

const Dashboard = (props) => {
  // useEffect(()=>{
  //   if(!sessionStorage.getItem("googleUserDetails")){
  //   window.location.href = "/home";
  //   }
  // })

  const [loading, setLoading] = useState(true);

  const details = {
    message: "Please wait while we configure your dashboard",
  };

  useEffect(() => {
    const { startTime, endTime, dates } = calculateDates();

    const bearerToken =
      "ya29.A0ARrdaM-0v7OozjocQLJPA7L51kblkSSL9eVapLC_jFsqhhAfvQtpZ1PNAZyYJkVO9I7ckACj0wCp5XChyZ_kePhsHvTFVeIjC1RXxnlvlb1yvKEUFMNGcsw5RATE39mVgfQ0wm1La7uZAc9dID-L899aGoGQvQ";

    async function fetchData() {
      await getStepCount(bearerToken, startTime, endTime, 86400000);
      await getDistance(bearerToken, startTime, endTime, 86400000);
      await getActiveMinutes(bearerToken, startTime, endTime, 86400000);
      await getCaloriesExpended(bearerToken, startTime, endTime, 86400000);
      await getHeartMinutes(bearerToken, startTime, endTime, 86400000);
      await getSleepSegment(bearerToken, startTime, endTime, 86400000);
      await getSpeed(bearerToken, startTime, endTime, 86400000);

      setLoading(false);
    }

    fetchData();
  }, []);

  return loading ? <Loader details={details}></Loader> : <p>Done</p>;
};

export default Dashboard;
