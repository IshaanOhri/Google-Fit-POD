import React from "react";
import { Hearts } from "react-loader-spinner";
import '../assets/styles/loader.css'

const Loader = (pops) => {
  const { message } = pops.details;

  return (
    <div className="loader">
      <Hearts color="#ff4d4d" height={200} width={200} />
      <p id="loaderMessage" className="shimmer">{message}</p>
    </div>
  );
};

export default Loader;