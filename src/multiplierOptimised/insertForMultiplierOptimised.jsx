import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./insertMo.css";
import { MyContext } from "../simpleContext";
import { useContext } from "react";

//bring in context and starting values
const InsertForMultiplierOptimised = () => {
  const [multiplier, setMultiplier] = useState();
  const [multiplicand, setMultiplicand] = useState();
  const { first, setFirst, second, setSecond } = useContext(MyContext);
  let ml = "";
  let mlbin = "";
  let mc = "";
  let mcbin = "";
  const [submit, setSubmit] = useState(false);

  //input handler, conversion
  const handleInputs = (e) => {
    e.preventDefault();
    setSubmit(true);

    mlbin = parseInt(ml, 10);
    mlbin = mlbin.toString(2);
    let ZeroForMl = 8 - mlbin.length;
    for (let i = 0; i < ZeroForMl; i++) {
      mlbin = "0" + mlbin;
    }
    
    mcbin = parseInt(mc, 10);
    mcbin = mcbin.toString(2);
    let ZeroForMc = 8 - mcbin.length;
    for (let i = 0; i < ZeroForMc; i++) {
      mcbin = "0" + mcbin;
    }
    
    setMultiplier(mlbin);
    setFirst(mlbin);
    setMultiplicand(mcbin);
    setSecond(mcbin);
    console.log(first);
    console.log(second);
  };

  //submit handler
  const handleSubmit = () => {
    setSubmit(false);
  };

  //enter mplier and mcand, check values, handle input & submit
  return (
    <div id="main">
      {submit === false ? (
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
      ) : (
        <div className="ValidDiv">
          <h1>Are values correct?</h1>
          <h3>Multiplier: {multiplier}</h3>
          <h3>Multiplicand: {multiplicand}</h3>
        </div>
      )}

      <br />
      <br />
      <br />
      {submit === false ? (
        <button
          className="linkBTN"
          onClick={(e) => {
            handleInputs(e);
          }}
        >
          Insert
        </button>
      ) : (
        <div>
          <div className="linkDiv">
            <Link className="link" to="multiplierOptimised">
              <h1>Yes</h1>
            </Link>
          </div>
          <button className="BTN" onClick={handleSubmit}>
            <h4>No</h4>
          </button>
        </div>
      )}
      <Link className="homeLinkInsert" to="/">Back to home</Link>
    </div>
  );
};

export default InsertForMultiplierOptimised;
