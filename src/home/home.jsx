import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="homeMain">
      <div className="allLinks">
        <div className="linkDivH">
          <Link className="link" to="insertForMultiplier">
            <h3>Multiplier</h3>
          </Link>
        </div>
        <div className="linkDivH">
          <Link className="link" to="insertForMultiplierOptimised">
            <h3>Multiplier Optimised</h3>
          </Link>
        </div>
        <div className="linkDivH">
          <Link className="link" to="insertForDivider">
            <h3>Divider</h3>
          </Link>
        </div>
        <div className="linkDivH">
          <Link className="link" to="insertForDividerOptimised">
            <h3>Divider Optimised</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
