import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="homeMain">
      <div className="allLinks">
        <div className="linkDivH">
          <Link className="link" to="insertForMultiplier">
            <h3>Multiplication</h3>
          </Link>
        </div>
        <div className="linkDivH">
          <Link className="link" to="insertForMultiplierOptimised">
            <h3>Optimised Multiplication</h3>
          </Link>
        </div>
        <div className="linkDivH">
          <Link className="link" to="insertForDivider">
            <h3>Division</h3>
          </Link>
        </div>
        <div className="linkDivH">
          <Link className="link" to="insertForDividerOptimised">
            <h3>Optimised Division</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
