import React from "react";
import "./insertMo.css";
const InsertForMultiplierOptimized = () => {
  let ml = "";
  let mc = "";

  const handleInputs = () => {
    console.log(ml, "multiplier");
    console.log(mc, "multiplicand");
  };

  return (
    <div id="main">
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="inputDiv">
          <label htmlFor="Mplier">
            <h1>Multiplier:</h1>
          </label>
          <input
            type="text"
            onChange={(e) => {
              ml = e.target.value;
            }}
          />
        </div>
        <br />
        <div className="inputDiv">
          <label htmlFor="Mcand">
            <h1>Multiplicand:</h1>
          </label>
          <input
            type="text"
            onChange={(e) => {
              mc = e.target.value;
            }}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <button onClick={handleInputs}>Insert</button>
    </div>
  );
};

export default InsertForMultiplierOptimized;
