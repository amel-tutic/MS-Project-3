import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./insertDo.css";
import { MyContext } from "../simpleContext";
import { useContext } from "react";

//bring in context and starting values
const InsertForDividerOptimised = () => {
  const [quotient, setQuotient] = useState();
  const [divisor, setDivisor] = useState();
  const { first, setFirst, second, setSecond } = useContext(MyContext);
  let quo = "";
  let quobin = "";
  let div = "";
  let divbin = "";
  const [submit, setSubmit] = useState(false);

  //input handler, conversion
  const handleInputs = (e) => {
    e.preventDefault();
    setSubmit(true);

    quobin = parseInt(quo, 10);
    quobin = quobin.toString(2);
    let ZeroForQuo = 8 - quobin.length;
    for (let i = 0; i < ZeroForQuo; i++) {
      quobin = "0" + quobin;
    }

    divbin = parseInt(div, 10);
    divbin = divbin.toString(2);
    let ZeroForDiv = 8 - divbin.length;
    for (let i = 0; i < ZeroForDiv; i++) {
      divbin = "0" + divbin;
    }

    setQuotient(quobin);
    setFirst(quobin);
    setDivisor(divbin);
    setSecond(divbin);
    console.log(first);
    console.log(second);
  };

  //submit handler
  const handleSubmit = () => {
    setSubmit(false);
  };

  //enter dividend and divisor, check values, handle input & submit
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
              <h1>Dividend:</h1>
            </label>
            <input
              type="text"
              onChange={(e) => {
                quo = e.target.value;
              }}
            />
          </div>
          <br />
          <div className="inputDiv">
            <label htmlFor="Mcand">
              <h1>Divisor:</h1>
            </label>
            <input
              type="text"
              onChange={(e) => {
                div = e.target.value;
              }}
            />
          </div>
        </div>
      ) : (
        <div className="ValidDiv">
          <h1>Are values correct?</h1>
          <h3>Dividend: {quotient}</h3>
          <h3>Divisor: {divisor}</h3>
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
            <Link className="link" to="dividerOptimised">
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

export default InsertForDividerOptimised;
