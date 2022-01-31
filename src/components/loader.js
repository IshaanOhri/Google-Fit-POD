import React from "react";
import { BallTriangle } from "react-loader-spinner";
import '../assets/styles/loader.css'

const Loader = (pops) => {
  const { message } = pops.details;

  return (
    <div className="loader">
      <BallTriangle color="#32d29b" height={200} width={200} />
      <p id="loaderMessage">{message}</p>
    </div>
  );
};

export default Loader;