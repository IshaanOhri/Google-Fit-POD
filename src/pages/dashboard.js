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
import { Header } from "../layouts/header";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { createGraphData } from "../utils/graphData";

const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);

  const details = {
    message: "Please wait while we configure your dashboard",
  };

  useEffect(() => {
    if (!sessionStorage.getItem("googleUserDetails")) {
      window.location.href = "/";
    }

    const { startTime, endTime, dates } = calculateDates();

    const bearerToken = JSON.parse(
      sessionStorage.getItem("googleUserDetails")
    ).accessToken;

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

  return loading ? (
    <Loader details={details}></Loader>
  ) : (
    <>
      <Header></Header>
      <div id="options">
        <table>
          <tbody>
            <tr>
              <td>
                <div className="option noselect" id="steps">
                  <img src={require("../assets/steps.png")} alt="" />
                  <p>Steps</p>
                </div>
              </td>

              <td>
                <div className="option noselect" id="steps">
                  <img src={require("../assets/distance.png")} alt="" />
                  <p>Distance</p>
                </div>
              </td>

              <td>
                <div className="option noselect" id="steps">
                  <img src={require("../assets/speed.png")} alt="" />
                  <p>Speed</p>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div className="option noselect" id="steps">
                  <img src={require("../assets/active-minutes.png")} alt="" />
                  <p>Active Minutes</p>
                </div>
              </td>

              <td>
                <div className="option noselect" id="steps">
                  <img src={require("../assets/calories.png")} alt="" />
                  <p>Calories Expended</p>
                </div>
              </td>

              <td>
                <div className="option noselect" id="steps">
                  <img src={require("../assets/heart-minutes.png")} alt="" />
                  <p>Heart Minutes</p>
                </div>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <div className="option noselect" id="steps">
                  <img src={require("../assets/sleep.png")} alt="" />
                  <p>Sleep Segment</p>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
  // return <ResponsiveContainer width="40%" aspect={3}>
  //   <BarChart
  //     width={500}
  //     height={300}
  //     data={createGraphData('steps')}
  //     barSize={30}
  //   >
  //     <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 50}} />
  //     <YAxis />
  //     <Tooltip />
  //     <Bar dataKey="data" name="Steps" fill="#32d29b"/>
  //   </BarChart>
  // </ResponsiveContainer>;
};

export default Dashboard;
