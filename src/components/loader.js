/*
 * @Author: Ishaan Ohri
 * @Date: 2022-01-31 22:37:29
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2022-01-31 22:39:17
 * @Description: React component for loader
 */
import React from "react";
import { BallTriangle } from "react-loader-spinner";
import "../assets/styles/loader.css";

const Loader = (pops) => {
  // Message to be displayed below loader
  const { message } = pops.details;

  return (
    <div className="loader">
      <BallTriangle color="#32d29b" height={200} width={200} />
      <p id="loaderMessage">{message}</p>
    </div>
  );
};

export default Loader;
