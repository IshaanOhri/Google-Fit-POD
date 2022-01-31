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
import { createGraphData } from "../utils/graphData";

const Steps = (props) => {
  const [loading, setLoading] = useState(true);
const [data, setData] = useState({});

  const details = {
    message: "Please wait while we arrange your data",
  };

  useEffect(() => {
    if (!sessionStorage.getItem("googleUserDetails")) {
      window.location.href = "/";
    }

    setData(createGraphData("steps"));

    setLoading(false);
  }, []);

  return loading ? (
    <Loader details={details}></Loader>
  ) : (
    <>
      <Header></Header>
      <div id="graph">
        <ResponsiveContainer width="80%" aspect={2}>
          <BarChart
            data={data}
            barSize={60}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 80, right: 80 }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="data" name="Steps" fill="#32d29b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div id="graphInfo">
          <p id="title">STEP COUNT</p>
          <p id="dates">{data[0].name} - {data[6].name}</p>
          </div>
    </>
  );
};

export default Steps;
