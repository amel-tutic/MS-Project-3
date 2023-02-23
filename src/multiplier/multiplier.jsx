import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { MyContext } from "../simpleContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import SchemaM from "./schema/schemaM";

//bring in context, define multiplier
const Multiplier = () => {
  const {
    first,
    second,
    prodCurr,
    setFirstCurr,
    setSecondCurr,
    setProdCurr,
    setActionCurr,
  } = useContext(MyContext);
  //define mcand, mplier, product
  let Ml = first;
  let Mc = second;
  let P = "0000000000000000";
  useEffect(() => {
    setFirstCurr(Ml);
    setSecondCurr(Mc);
    setProdCurr(P);
    setActionCurr("initial values");
  }, []);

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
  function ToEnd() {
    setTimeout(cons, 2000);
  }

  function cons() {
    console.log("mirza");
  }
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
          setActionCurr("Prod = Prod + Mcand");
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
          setProdCurr(prodTemp.join(""));
        } else {
          setListOfAction([...listOfAction, "1b: No operation (LSB=0)"]);
          setActionCurr("No operation");
        }
      }

      //step two
      if (steps === 2) {
        setListOfAction([...listOfAction, "2: Shift left Multiplicand"]);
        setActionCurr("Shift left Multiplicand");
        //unreverse and shift left mcand
        mcandTemp.reverse();
        mcandTemp = mcandTemp.slice(1).join("") + "0";
        setSecondCurr(mcandTemp);
        setMcand(mcandTemp);
      }

      //step three
      if (steps === 3) {
        setListOfAction([...listOfAction, "3: Shift right Multiplier"]);
        setActionCurr("Shift right Multiplier");
        //shift right mplier, reset steps
        mplierTemp = "0" + mplierTemp.slice(0, 7).join("");
        setFirstCurr(mplierTemp);
        setMplier(mplierTemp);
        step = 0;
        // setTableStep([...tableStep]);
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
            <tr className="trStyle">{listOfAction[0]}</tr>
          </td>
          <td className="numberOfStepZero">
            <tr className="trStyle">
              {Ml.split("").map((item, index) => {
                if (index != 7) {
                  return <div>{item}</div>;
                } else {
                  return <div className="LSB">{item}</div>;
                }
              })}
            </tr>
          </td>
          <td className="numberOfStepZero">
            <tr className="trStyle">{Mc}</tr>
          </td>
          <td className="numberOfStepZero">
            <tr className="trStyle">{P}</tr>
          </td>
        </tr>

        {/* step by step representation */}
        {/* formulas for iteration according to steps -> [step*3-2, step*3-1, step*3] */}
        {tableStep.map((item, index) => {
          let lsbM = listOfMplier[item * 3];
          return (
            <tr>
              {/* step */}
              <td className="numberOfStepS">{item}</td>

              {/* action */}
              <td className="numberOfStepM">
                <p>
                  <tr className="trStyle">{listOfAction[item * 3 - 2]}</tr>
                </p>
                <p>
                  <tr className="trStyle">{listOfAction[item * 3 - 1]}</tr>
                </p>
                <tr className="trStyle">{listOfAction[item * 3]}</tr>
              </td>

              {/* mplier */}
              <td className="numberOfStepM">
                <p>
                  <tr className="trStyle">{listOfMplier[item * 3 - 2]}</tr>
                </p>
                <p>
                  <tr className="trStyle">{listOfMplier[item * 3 - 1]}</tr>
                </p>
                <tr className="ActiveD">
                  {item !== 8
                    ? lsbM !== undefined
                      ? lsbM.split("").map((item, index) => {
                          if (index != 7) {
                            return <div>{item}</div>;
                          } else {
                            return <div className="LSB">{item}</div>;
                          }
                        })
                      : null
                    : lsbM}
                </tr>
              </td>

              {/* mcand */}
              <td className="numberOfStepM">
                <p>
                  <tr className="trStyle">{listOfMcand[item * 3 - 2]}</tr>
                </p>
                <p>
                  <tr className="ActiveD">{listOfMcand[item * 3 - 1]}</tr>
                </p>
                <tr className="trStyle">{listOfMcand[item * 3]}</tr>
              </td>

              {/* product */}
              <td className="numberOfStepM">
                <p>
                  <tr
                    className={
                      listOfAction[item * 3 - 2] === "1b: No operation (LSB=0)"
                        ? "trStyle"
                        : "ActiveM"
                    }
                  >
                    {listOfProd[item * 3 - 2]}
                  </tr>
                </p>
                <p>
                  <tr className="trStyle">{listOfProd[item * 3 - 1]}</tr>
                </p>
                <tr className="trStyle">{listOfProd[item * 3]}</tr>
              </td>
            </tr>
          );
        })}
      </table>

      {/* basic representation with Next button */}
      <div className="prdBtnM">
        {/* <h1>Operation: {listOfAction[listOfAction.length - 1]}</h1>
        <h1> Multiplier: {mplier}</h1>
        <br />
        <h1>Multiplicand: {mcand} </h1>
        <br />
        <h1>Product: {prod}</h1>
        <br /> */}
        <SchemaM />
        {iteration > 24 ? (
          <Link className="homeLinkM" to="/">
            Back to home
          </Link>
        ) : (
          <button onClick={Step}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Multiplier;
