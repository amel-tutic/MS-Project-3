import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";

//define multiplier
const Multiplier = () => {
  //define mcand, mplier, product
  let Ml = "00010011";
  let Mc = "0000000000011111";
  let P = "0000000000000000";

  //define states
  const [mplier, setMplier] = useState(Ml);
  const [mcand, setMcand] = useState(Mc);
  const [prod, setProd] = useState(P);
  const [steps, setSteps] = useState(1);
  const [iteration, setIteration] = useState(1);
  const [listOfMplier, setListOfMplier] = useState([]);
  const [listOfMcand, setListOfMcand] = useState([]);
  const [listOfProd, setListOfProd] = useState([]);
  const [tableStep, setTableStep] = useState([]);
  const [listOfAction, setListOfAction] = useState(["Initial values"]);

  //define iteration effect
  useEffect(() => {
    if (iteration !== 0) {
      setListOfProd([...listOfProd, prod]);
      setListOfMcand([...listOfMcand, mcand]);
      setListOfMplier([...listOfMplier, mplier]);
    }
    if ((iteration + 1) % 3 === 0 && iteration < 25) {
      setTableStep([...tableStep, (iteration + 1) / 3]);
    }
  }, [iteration]);

  //helper for reseting steps
  let step = steps;

  //function for a whole step
  function Step() {
    if (iteration <= 24) {
      console.log(iteration);

      let mplierTemp = mplier;
      let mcandTemp = mcand;
      let prodTemp = prod;
      let carry = 0;
      let carryTemp = 0;

      //split & reverse for bit by bit checking & addition
      mplierTemp = mplierTemp.split("");
      mcandTemp = mcandTemp.split("");
      mcandTemp.reverse();
      prodTemp = prodTemp.split("");
      prodTemp.reverse();

      //step one
      if (steps === 1) {
        if (mplierTemp[7] === "1") {
          setListOfAction([...listOfAction, "1a: Prod = Prod + Mcand (LSB=1)"]);

          //addition, prod=prod+mcand
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
          //unreverse and join product bits
          setProd(prodTemp.reverse().join(""));
        } else {
          setListOfAction([...listOfAction, "1b: No operation (LSB=0)"]);
        }
      }

      //step two
      if (steps === 2) {
        setListOfAction([...listOfAction, "2: Shif left Multiplicand"]);

        //unreverse and shift left mcand
        mcandTemp.reverse();
        mcandTemp = mcandTemp.slice(1).join("") + "0";
        setMcand(mcandTemp);
      }

      //step three
      if (steps === 3) {
        setListOfAction([...listOfAction, "3: Shif right Multiplier"]);

        //shift right mplier, reset steps
        mplierTemp = "0" + mplierTemp.slice(0, 7).join("");
        setMplier(mplierTemp);
        step = 0;
        setTableStep([...tableStep]);
      }
      setSteps(step + 1);
    }
    //next iteration
    setIteration(iteration + 1);
  }

  //visual representation
  return (
    <div className="mainM">
      <table>
        {/* headers and initial values */}
        <th className="headerM">Step</th>
        <th className="headerActionM">Action</th>
        <th className="headerM">Mplier</th>
        <th className="headerM">Mcand</th>
        <th className="headerM">Prod</th>
        <tr>
          <td className="numberOfStepZero">0</td>
          <td className="numberOfStepZero">
            <tr>{listOfAction[0]}</tr>
          </td>
          <td className="numberOfStepZero">
            <tr>{Ml}</tr>
          </td>
          <td className="numberOfStepZero">
            <tr>{Mc}</tr>
          </td>
          <td className="numberOfStepZero">
            <tr>{P}</tr>
          </td>
        </tr>

        {/* step by step representation */}
        {/* formulas for iteration according to steps -> [step*3-2, step*3-1, step*3] */}
        {tableStep.map((item, index) => {
          return (
            <tr>
              <td className="numberOfStepS">{item}</td>
              <td className="numberOfStepM">
                <p>
                  <tr>{listOfAction[item * 3 - 2]}</tr>
                </p>
                <p>
                  <tr>{listOfAction[item * 3 - 1]}</tr>
                </p>
                <tr>{listOfAction[item * 3]}</tr>
              </td>
              <td className="numberOfStepM">
                <p>
                  <tr>{listOfMplier[item * 3 - 2]}</tr>
                </p>
                <p>
                  <tr>{listOfMplier[item * 3 - 1]}</tr>
                </p>
                <tr>{listOfMplier[item * 3]}</tr>
              </td>
              <td className="numberOfStepM">
                <p>
                  <tr>{listOfMcand[item * 3 - 2]}</tr>
                </p>
                <p>
                  {" "}
                  <tr>{listOfMcand[item * 3 - 1]}</tr>
                </p>
                <tr>{listOfMcand[item * 3]}</tr>
              </td>
              <td className="numberOfStepM">
                <p>
                  <tr>{listOfProd[item * 3 - 2]}</tr>
                </p>
                <p>
                  <tr>{listOfProd[item * 3 - 1]}</tr>
                </p>
                <tr>{listOfProd[item * 3]}</tr>
              </td>
            </tr>
          );
        })}
      </table>

      {/* basic representation with Next button */}
      <div className="prdBtnM">
        <h1>Operation: {listOfAction[listOfAction.length - 1]}</h1>
        <h1> Multiplier: {mplier}</h1>
        <br />
        <h1>Multiplicand: {mcand} </h1>
        <br />
        <h1>Product: {prod}</h1>
        <br />
        <button onClick={Step}>Next</button>
      </div>
    </div>
  );
};

export default Multiplier;
