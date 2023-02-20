import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="homeMain">
      <div className="allLinks">
        <div className="linkDiv">
          <Link className="link" to="multiplier">
            <h3>Multiplier</h3>
          </Link>
        </div>
        <div className="linkDiv">
          <Link className="link" to="multiplierOptimized">
            <h3>Multiplier Optimized</h3>
          </Link>
        </div>
        <div className="linkDiv">
          <Link className="link" to="divider">
            <h3>Divider</h3>
          </Link>
        </div>
        <div className="linkDiv">
          <Link className="link" to="dividerOptimized">
            <h3>Divider Optimized</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
