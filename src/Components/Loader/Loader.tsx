import React,{useState,useEffect, CSSProperties } from "react";
import ClockLoader from "react-spinners/ClockLoader";

const override: CSSProperties = {
  position:"relative",
  margin:"40vh auto",
  borderColor: "white",
};

function Loader() {
 
return (<ClockLoader
          cssOverride={override}
          size={120}
          aria-label="Loading Spinner"
          data-testid="loader"
      />)}

export default Loader;
