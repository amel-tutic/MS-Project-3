import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="homeMain">
      <div className="allLinks">
        <div className="linkDiv">
          <Link className="link" to="insertForMultiplier">
            <h3>Multiplier</h3>
          </Link>
        </div>
        <div className="linkDiv">
          <Link className="link" to="insertForMultiplierOptimized">
            <h3>Multiplier Optimized</h3>
          </Link>
        </div>
        <div className="linkDiv">
          <Link className="link" to="insertForDivider">
            <h3>Divider</h3>
          </Link>
        </div>
        <div className="linkDiv">
          <Link className="link" to="insertForDividerOptimized">
            <h3>Divider Optimized</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
