import React from "react";
import "./insertDo.css";
const InsertForDividerOptimized = () => {
  let divisor = "";
  let dividend = "";

  const handleInputs = () => {
    console.log(divisor, "divisor");
    console.log(dividend, "dividend");
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
          <label htmlFor="Divisor">
            <h1>Divisor:</h1>
          </label>
          <input
            type="text"
            onChange={(e) => {
              divisor = e.target.value;
            }}
          />
        </div>
        <br />
        <div className="inputDiv">
          <label htmlFor="Mcand">
            <h1>Dividend:</h1>
          </label>
          <input
            type="text"
            onChange={(e) => {
              dividend = e.target.value;
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

export default InsertForDividerOptimized;
