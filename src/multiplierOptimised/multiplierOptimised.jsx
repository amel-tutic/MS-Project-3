import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { MyContext } from "../simpleContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import SchemaMO from "./schemaMO/schemaMO";

//bring in context, define multiplierOptimised
const MultiplierOptimised = () => {
  const {
    first,
    setFirst,
    second,
    setSecondsetFirstCurr,
    setSecondCurr,
    setProdCurr,
    setActionCurr,
    currIteration,
    setCurrIteration,
    setFinish,
  } = useContext(MyContext);
  //define mplier, mcand, product, prod/mplier
  let Ml = first;
  let Mc = second;
  let P = "00000000";
  let PML = P + Ml;

  //define states
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
  const [i, setI] = useState(1);
  let lsbPML = "";
  useEffect(() => {
    if (iteration === 1) {
      setActionCurr("initial values");
      setProdCurr(PML);
      setSecondCurr(first);
      setCurrIteration(1);
    }
  }, [iteration]);

  //define iteration effect
  useEffect(() => {
    if (iteration !== 0) {
      setListOfPM([...listOfPM, prodMplier]);
      setListOfMcand([...listOfMcand, mcand]);
    }
    if (iteration % 2 === 0) {
      setTableStep([...tableStep, iteration / 2]);
    }
  }, [iteration]);

  //define effect for prod and mplier concatenation
  useEffect(() => {
    setProdMplier(prod + mplier);
  }, []);

  //helper for reseting steps
  let step = steps;
  useEffect(() => {
    if (i != 1) {
      if (iteration <= 16) {
        console.log(iteration);

        let mplierTemp = mplier;
        let mcandTemp = mcand;
        let prodTemp = prod;
        let carry = 0;
        let carryTemp = 0;

        //split & reverse for bit by bit checking & addition
        mcandTemp = mcandTemp.split("");
        mcandTemp.reverse();
        prodTemp = prodTemp.split("");
        prodTemp.reverse();

        //step one
        if (steps === 1) {
          if (prodMplier[15] === "0") {
            setListOfAction([...listOfAction, "1b: No operation (LSB = 0)"]);
            setActionCurr("No operation");
          } else {
            setListOfAction([
              ...listOfAction,
              "1a: Prod = Prod + Mcand (LSB = 1)",
            ]);
            setActionCurr("Prod = Prod + Mcand");

            //additon, prod=prod+mcand
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

            //unreverse and join product and mplier bits
            setProdMplier(prodTemp.reverse().join("") + mplier);
          }
        }

        //step two
        if (steps === 2) {
          setListOfAction([...listOfAction, "2: Rshift Prod/Mplier"]);
          setActionCurr("Rshift Prod/Mplier");
          //create and right shift prod/mplier representation, and reset steps
          let prodMplierTemp = prodMplier.split("");
          prodMplierTemp = "0" + prodMplierTemp.slice(0, 15).join("");
          setMplier(prodMplierTemp.slice(8));
          setProd(prodMplierTemp.slice(0, 8));

          setProdMplier(prodMplierTemp);
          setProdCurr(prodMplierTemp);
          step = 0;
        }
        setSteps(step + 1);
      }
      let i = iteration + 1;
      //next iteration
      if (iteration < 17) {
        setIteration(iteration + 1);
        setCurrIteration(i);
      }
    }
    if (i < 17 && i !== 1) {
      setI(i + 1);
      let k = 2;
      setFinish(k + 2);
    }
  }, [i]);
  //function for a whole step
  function Step() {
    if (iteration <= 16) {
      console.log(iteration);

      let mplierTemp = mplier;
      let mcandTemp = mcand;
      let prodTemp = prod;
      let carry = 0;
      let carryTemp = 0;

      //split & reverse for bit by bit checking & addition
      mcandTemp = mcandTemp.split("");
      mcandTemp.reverse();
      prodTemp = prodTemp.split("");
      prodTemp.reverse();

      //step one
      if (steps === 1) {
        if (prodMplier[15] === "0") {
          setListOfAction([...listOfAction, "1b: No operation (LSB = 0)"]);
          setActionCurr("No operation");
        } else {
          setListOfAction([
            ...listOfAction,
            "1a: Prod = Prod + Mcand (LSB = 1)",
          ]);
          setActionCurr("Prod = Prod + Mcand");

          //additon, prod=prod+mcand
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

          //unreverse and join product and mplier bits
          setProdMplier(prodTemp.reverse().join("") + mplier);
        }
      }

      //step two
      if (steps === 2) {
        setListOfAction([...listOfAction, "2: Rshift Prod/Mplier"]);
        setActionCurr("Rshift Prod/Mplier");
        //create and right shift prod/mplier representation, and reset steps
        let prodMplierTemp = prodMplier.split("");
        prodMplierTemp = "0" + prodMplierTemp.slice(0, 15).join("");
        setMplier(prodMplierTemp.slice(8));
        setProd(prodMplierTemp.slice(0, 8));

        setProdMplier(prodMplierTemp);
        setProdCurr(prodMplierTemp);
        step = 0;
      }
      setSteps(step + 1);
    }
    let i = iteration + 1;
    //next iteration
    if (iteration < 17) {
      setIteration(iteration + 1);
      setCurrIteration(i);
    }
  }
  function Finsish() {
    let k = i;
    setI(k + 1);
  }

  //visual representation
  return (
    <div className="main">
      <table>
        {/* headers and initial values */}
        <th className="header">Step</th>
        <th className="headerAction">Action</th>
        <th className="header">Mcand</th>
        <th className="header">Prod/Mplier</th>
        <tr>
          <td className="numberOfStepZero">0</td>
          <td className="numberOfStepZero">
            <tr className="prodLSBAction">{listOfAction[0]}</tr>
          </td>
          <td className="numberOfStepZero">
            <tr className="prodLSB">{listOfMcand[0]}</tr>
          </td>
          <td className="numberOfStepZero">
            <tr className="prodLSB">
              {PML.split("").map((item, index) => {
                if (index != 15) {
                  return <div>{item}</div>;
                } else {
                  return <div className="LSB">{item}</div>;
                }
              })}
            </tr>
          </td>
        </tr>

        {/* step by step representation */}
        {/* formulas for iteration according to steps -> [step*2-1, step*2] */}
        {tableStep.map((item, index) => {
          lsbPML = listOfPM[item * 2];

          return (
            <tr>
              {/* step */}
              <td className="numberOfStepS">{item}</td>

              {/* action */}
              <td className="numberOfStep">
                <p>
                  <tr className="prodLSBAction">
                    <div>{listOfAction[item * 2 - 1]}</div>
                  </tr>
                </p>
                <tr className="prodLSBAction">
                  <div>{listOfAction[item * 2]}</div>
                </tr>
              </td>

              {/* mcand */}
              <td className="numberOfStep">
                <p>
                  <tr className="prodLSB">
                    <div>{listOfMcand[item * 2 - 1]}</div>
                  </tr>
                </p>
                <tr className="prodLSB">
                  <div>{listOfMcand[item * 2]}</div>
                </tr>
              </td>

              {/* prod/mplier */}
              <td className="numberOfStep">
                <p>
                  <tr
                    className={
                      listOfAction[item * 2 - 1] !==
                      "1b: No operation (LSB = 0)"
                        ? "Active"
                        : "prodLSB"
                    }
                  >
                    <div>{listOfPM[item * 2 - 1]}</div>
                  </tr>
                </p>
                <tr className="prodLSB">
                  {item != 8
                    ? lsbPML !== undefined
                      ? lsbPML.split("").map((item, index) => {
                          if (index != 15) {
                            return <div>{item}</div>;
                          } else {
                            if (item === "1") {
                              return <div className="LSB">{item}</div>;
                            } else return <div>{item}</div>;
                          }
                        })
                      : null
                    : lsbPML}
                </tr>
              </td>
            </tr>
          );
        })}
      </table>

      {/* basic representation with Next button */}
      <div className="prdBtn">
        {/* <h1>Operation: {listOfAction[listOfAction.length - 1]}</h1>
        <h1>Multiplicand: {mcand}</h1>
        <h1>Product/Multiplier: {prodMplier}</h1> */}
        <SchemaMO />
        {iteration > 16 ? (
          <Link className="homeLinkMo" to="/">
            Back to home
          </Link>
        ) : (
          <div>
            <button onClick={Step}>Next</button>
            <button onClick={Finsish}>Finish</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiplierOptimised;
