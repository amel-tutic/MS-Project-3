import React, { useEffect } from "react";
import { useState } from "react";
import Multiplier from "../multiplier/multiplier";
import "./style.css";
const MultiplierOptimised = () => {
  let Mc = "00000010";
  let P = "00000000";
  let Ml = "00011001";
  let PML = P + Ml;

  const [mplier, setMplier] = useState(Ml);
  const [mcand, setMcand] = useState(Mc);
  const [prod, setProd] = useState(P);
  const [steps, setSteps] = useState(1);
  const [iteration, setIteration] = useState(1);
  const [prodMplier, setProdMplier] = useState(PML);
  const [tableStep, setTableStep] = useState([]);
  const [listOfPM, setListOfPM] = useState([]);
  const [listOfMcand, setListOfMcand] = useState([]);
  const [listOfAction, setListOfAction] = useState(["Initial values"]);
  useEffect(() => {
    if (iteration !== 0) {
      setListOfPM([...listOfPM, prodMplier]);
      setListOfMcand([...listOfMcand, mcand]);
    }
    if (iteration % 2 === 0) {
      setTableStep([...tableStep, iteration / 2]);
    }
  }, [iteration]);

  useEffect(() => {
    setProdMplier(prod + mplier);
  }, []);

  let step = steps;

  function Step() {
    if (iteration <= 16) {
      console.log(iteration);

      let mplierTemp = mplier;
      let mcandTemp = mcand;
      let prodTemp = prod;
      let carry = 0;
      let carryTemp = 0;

      mcandTemp = mcandTemp.split("");
      mcandTemp.reverse();

      prodTemp = prodTemp.split("");
      prodTemp.reverse();

      if (steps === 1) {
        if (prodMplier[15] === "0")
          setListOfAction([...listOfAction, "1b: No operation (LSB = 0)"]);
        else {
          setListOfAction([...listOfAction, "1a: Prod = Prod + Mcand (LSB = 1)"]);
          prodTemp = prodTemp.map((item, index) => {
            carry = carryTemp;
            carryTemp = 0;

            if (carry === 0) {
              if (mcandTemp[index] === "0") {
                return item;
              } else if (item === "0") {
                return mcandTemp[index];
              } else {
                carryTemp = 1;
                return (item = "0");
              }
            } else if (carry === 1) {
              if (mcandTemp[index] === "0" && item === "0") {
                return "1";
              } else if (
                (mcandTemp[index] === "0" && item === "1") ||
                (mcandTemp[index] === "1" && item === "0")
              ) {
                carryTemp = 1;
                return "0";
              } else {
                carryTemp = 1;
                return (item = "1");
              }
            }
          });

          setProdMplier(prodTemp.reverse().join("") + mplier);
        }
      }

      if (steps === 2) {
        setListOfAction([...listOfAction, "Rshift Prod/Mplier"]);
        let prodMplierTemp = prodMplier.split("");
        prodMplierTemp = "0" + prodMplierTemp.slice(0, 15).join("");
        setMplier(prodMplierTemp.slice(8));
        setProd(prodMplierTemp.slice(0, 8));
        setProdMplier(prodMplierTemp);
        step = 0;
      }
      setSteps(step + 1);
    }
    if (iteration < 17) {
      setIteration(iteration + 1);
    }
  }

  return (
    <div className="main">
      <table>
        <th className="header">Step</th>
        <th className="headerAction">Action</th>
        <th className="header">Mcand</th>
        <th className="header">Prod/Mplier</th>
        <tr>
          <td className="numberOfStepS">0</td>
          <td className="numberOfStep">
            <tr>{listOfAction[0]}</tr>
          </td>
          <td className="numberOfStep">
            <tr>{listOfMcand[0]}</tr>
          </td>
          <td className="numberOfStep">
            <tr>{listOfPM[0]}</tr>
          </td>
        </tr>
        {tableStep.map((item, index) => {
          return (
            <tr>
              <td className="numberOfStepS">{item}</td>
              <td className="numberOfStep">
                <tr>{listOfAction[item * 2 - 1]}</tr>
                <tr>{listOfAction[item * 2]}</tr>
              </td>
              <td className="numberOfStep">
                <tr>{listOfMcand[item * 2 - 1]}</tr>
                <tr>{listOfMcand[item * 2]}</tr>
              </td>
              <td className="numberOfStep">
                <tr>{listOfPM[item * 2 - 1]}</tr>
                <tr>{listOfPM[item * 2]}</tr>
              </td>
            </tr>
          );
        })}
      </table>
      <div className="prdBtn">
        <h1>Operation: {listOfAction[listOfAction.length - 1]}</h1>
        <h1>Mcand: {prodMplier}</h1>
        <h1>Prod/Mplier: {prodMplier}</h1>
        <button onClick={Step}>Next</button>
      </div>
    </div>
  );
};

export default MultiplierOptimised;
