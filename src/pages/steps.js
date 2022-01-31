import React, { useEffect, useState } from "react";
import "../assets/styles/graph.css";
import Loader from "../components/loader";
import { Header } from "../layouts/header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { createGraphDataFull } from "../utils/graphData";

const Steps = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const details = {
    message: "Please wait while we arrange your data",
  };

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

    setData(createGraphDataFull("steps"));

    setLoading(false);
  }, []);

  return loading ? (
    <Loader details={details}></Loader>
  ) : (
    <>
      <Header></Header>
      <div id="graph">
        <ResponsiveContainer width="60%" aspect={2}>
          <BarChart data={data} barSize={60}>
            <XAxis
              dataKey="name"
              scale="point"
              style={{ fontSize: "0.8rem" }}
              tickMargin={10}

              interval={0}
              padding={{ left: 80, right: 80 }}
            />
            <YAxis style={{ fontSize: "0.8rem" }} />
            <Tooltip />
            <Bar dataKey="data" name="Steps" fill="#32d29b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div id="graphInfo">
        <p id="title">STEP COUNT</p>
        <p id="dates">
          {data[0].name} - {data[6].name}
        </p>
      </div>
    </>
  );
};

export default Steps;
