import React, { useEffect, useState } from "react";
import "./div.css";
import { MyContext } from "../simpleContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import SchemaD from "./schema/schemaD";

//bring in context, define divider
const Divider = () => {
  const {
    first,
    second,
    prodCurr,
    setFirstCurr,
    setSecondCurr,
    setProdCurr,
    setActionCurr,
    setFinish,
  } = useContext(MyContext);
  //define quotient, divisor, remainder
  let Q = "00000000 ";
  let D = second + "00000000";
  let R = first;

  //number 1, for two's complement, reversed for the sake of easier addition
  let ONE = [
    "1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ];

  //define states
  const [quotient, setQuotient] = useState(Q);
  const [divisor, setDivisor] = useState(D);
  const [remainder, setRemainder] = useState(R);
  const [listOfQuotient, setListOfQuotient] = useState([]);
  const [listOfDivisor, setListOfDivisor] = useState([]);
  const [listOfRemainder, setListOfRemainder] = useState([]);
  const [listOfAction, setListOfAction] = useState(["Initial values"]);
  const [steps, setSteps] = useState(1);
  const [iteration, setIteration] = useState(1);
  const [tableStep, setTableStep] = useState([]);
  const [i, setI] = useState(1);
  let msbR = "";

  if (iteration === 1) {
    setFirstCurr(D);
    setSecondCurr(Q);
    setProdCurr(R);
    setActionCurr("initial values");
  }

  //define iteration effect
  useEffect(() => {
    if (iteration !== 0) {
      setListOfQuotient([...listOfQuotient, quotient]);
      setListOfDivisor([...listOfDivisor, divisor]);
      setListOfRemainder([...listOfRemainder, remainder]);
    }
    if ((iteration + 1) % 3 === 0 && iteration < 28) {
      setTableStep([...tableStep, (iteration + 1) / 3]);
    }
  }, [iteration]);
  useEffect(() => {
    if (i != 1) {
      if (iteration <= 27) {
        console.log(iteration);

        let quotientTemp = quotient;
        let divisorTemp = divisor;
        let remainderTemp = remainder;
        let carry = 0;
        let carryTemp = 0;

        //split & reverse for bit by bit checking & addition
        remainderTemp = remainderTemp.split("");
        divisorTemp = divisorTemp.split("");
        quotientTemp = quotientTemp.split("");
        divisorTemp.reverse();
        remainderTemp.reverse();

        //step one
        if (steps === 1) {
          setListOfAction([...listOfAction, "1: Rem = Rem - Div "]);
          setActionCurr("Rem = Rem - Div");

          //one's complement
          divisorTemp = divisorTemp.map((item) => {
            if (item === "0") {
              return "1";
            } else return "0";
          });

          //two's complement
          divisorTemp = divisorTemp.map((item, index) => {
            carry = carryTemp;
            carryTemp = 0;

            if (carry === 0) {
              if (ONE[index] === "0") {
                return item;
              } else if (item === "0") {
                return ONE[index];
              } else {
                carryTemp = 1;
                return (item = "0");
              }
            } else if (carry === 1) {
              if (ONE[index] === "0" && item === "0") {
                return "1";
              } else if (
                (ONE[index] === "0" && item === "1") ||
                (ONE[index] === "1" && item === "0")
              ) {
                carryTemp = 1;
                return "0";
              } else {
                carryTemp = 1;
                return (item = "1");
              }
            }
          });

          //rem = rem - div
          remainderTemp = remainderTemp.map((item, index) => {
            carry = carryTemp;
            carryTemp = 0;

            if (carry === 0) {
              if (divisorTemp[index] === "0") {
                return item;
              } else if (item === "0") {
                return divisorTemp[index];
              } else {
                carryTemp = 1;
                return (item = "0");
              }
            } else if (carry === 1) {
              if (divisorTemp[index] === "0" && item === "0") {
                return "1";
              } else if (
                (divisorTemp[index] === "0" && item === "1") ||
                (divisorTemp[index] === "1" && item === "0")
              ) {
                carryTemp = 1;
                return "0";
              } else {
                carryTemp = 1;
                return (item = "1");
              }
            }
          });

          //unreverse and join remainder bits
          setRemainder(remainderTemp.reverse().join(""));
          setProdCurr(remainderTemp.join(""));
        }

        //step two
        if (steps === 2) {
          if (remainder[0] === "1") {
            setListOfAction([...listOfAction, "2b: Rem<0, R+D , Q<<"]);
            setActionCurr("Rem<0");
            remainderTemp = remainderTemp.map((item, index) => {
              carry = carryTemp;
              carryTemp = 0;

              if (carry === 0) {
                if (divisorTemp[index] === "0") {
                  return item;
                } else if (item === "0") {
                  return divisorTemp[index];
                } else {
                  carryTemp = 1;
                  return (item = "0");
                }
              } else if (carry === 1) {
                if (divisorTemp[index] === "0" && item === "0") {
                  return "1";
                } else if (
                  (divisorTemp[index] === "0" && item === "1") ||
                  (divisorTemp[index] === "1" && item === "0")
                ) {
                  carryTemp = 1;
                  return "0";
                } else {
                  carryTemp = 1;
                  return (item = "1");
                }
              }
            });

            //unreverse and join remainder bits
            setRemainder(remainderTemp.reverse().join(""));

            quotientTemp = quotientTemp.slice(1, 8).join("") + "0";
            setQuotient(quotientTemp);
            setSecondCurr(quotientTemp);
            setProdCurr(remainderTemp.join(""));
          } else {
            setListOfAction([...listOfAction, "2a:Rem >= 0, Q<<,Q0 = 1"]);
            setActionCurr("Rem>=0");
            quotientTemp = quotientTemp.slice(1, 8).join("") + "1";
            setQuotient(quotientTemp);
            setSecondCurr(quotientTemp);
          }
        }

        //step three
        if (steps === 3) {
          setListOfAction([...listOfAction, "3: Shift right Divisor"]);
          setActionCurr("Shift right divisor");
          divisorTemp.reverse();

          //shift right mplier, reset steps
          divisorTemp = "0" + divisorTemp.slice(0, 15).join("");
          setDivisor(divisorTemp);
          setFirstCurr(divisorTemp);
          step = 0;
          setTableStep([...tableStep]);
        }
        setSteps(step + 1);
      }
      //next iteration
      setIteration(iteration + 1);
    }
    if (i < 28 && i !== 1) {
      setI(i + 1);
      let k = 2;
      setFinish(k + 2);
    }
  }, [i]);
  //helper for reseting steps
  let step = steps;

  //function for a whole step
  function Step() {
    if (iteration <= 27) {
      console.log(iteration);

      let quotientTemp = quotient;
      let divisorTemp = divisor;
      let remainderTemp = remainder;
      let carry = 0;
      let carryTemp = 0;

      //split & reverse for bit by bit checking & addition
      remainderTemp = remainderTemp.split("");
      divisorTemp = divisorTemp.split("");
      quotientTemp = quotientTemp.split("");
      divisorTemp.reverse();
      remainderTemp.reverse();

      //step one
      if (steps === 1) {
        setListOfAction([...listOfAction, "1: Rem = Rem - Div "]);
        setActionCurr("Rem = Rem - Div");

        //one's complement
        divisorTemp = divisorTemp.map((item) => {
          if (item === "0") {
            return "1";
          } else return "0";
        });

        //two's complement
        divisorTemp = divisorTemp.map((item, index) => {
          carry = carryTemp;
          carryTemp = 0;

          if (carry === 0) {
            if (ONE[index] === "0") {
              return item;
            } else if (item === "0") {
              return ONE[index];
            } else {
              carryTemp = 1;
              return (item = "0");
            }
          } else if (carry === 1) {
            if (ONE[index] === "0" && item === "0") {
              return "1";
            } else if (
              (ONE[index] === "0" && item === "1") ||
              (ONE[index] === "1" && item === "0")
            ) {
              carryTemp = 1;
              return "0";
            } else {
              carryTemp = 1;
              return (item = "1");
            }
          }
        });

        //rem = rem - div
        remainderTemp = remainderTemp.map((item, index) => {
          carry = carryTemp;
          carryTemp = 0;

          if (carry === 0) {
            if (divisorTemp[index] === "0") {
              return item;
            } else if (item === "0") {
              return divisorTemp[index];
            } else {
              carryTemp = 1;
              return (item = "0");
            }
          } else if (carry === 1) {
            if (divisorTemp[index] === "0" && item === "0") {
              return "1";
            } else if (
              (divisorTemp[index] === "0" && item === "1") ||
              (divisorTemp[index] === "1" && item === "0")
            ) {
              carryTemp = 1;
              return "0";
            } else {
              carryTemp = 1;
              return (item = "1");
            }
          }
        });

        //unreverse and join remainder bits
        setRemainder(remainderTemp.reverse().join(""));
        setProdCurr(remainderTemp.join(""));
      }

      //step two
      if (steps === 2) {
        if (remainder[0] === "1") {
          setListOfAction([...listOfAction, "2b: Rem<0, R+D , Q<<"]);
          setActionCurr("Rem<0");
          remainderTemp = remainderTemp.map((item, index) => {
            carry = carryTemp;
            carryTemp = 0;

            if (carry === 0) {
              if (divisorTemp[index] === "0") {
                return item;
              } else if (item === "0") {
                return divisorTemp[index];
              } else {
                carryTemp = 1;
                return (item = "0");
              }
            } else if (carry === 1) {
              if (divisorTemp[index] === "0" && item === "0") {
                return "1";
              } else if (
                (divisorTemp[index] === "0" && item === "1") ||
                (divisorTemp[index] === "1" && item === "0")
              ) {
                carryTemp = 1;
                return "0";
              } else {
                carryTemp = 1;
                return (item = "1");
              }
            }
          });

          //unreverse and join remainder bits
          setRemainder(remainderTemp.reverse().join(""));

          quotientTemp = quotientTemp.slice(1, 8).join("") + "0";
          setQuotient(quotientTemp);
          setSecondCurr(quotientTemp);
          setProdCurr(remainderTemp.join(""));
        } else {
          setListOfAction([...listOfAction, "2a:Rem >= 0, Q<<,Q0 = 1"]);
          setActionCurr("Rem>=0");
          quotientTemp = quotientTemp.slice(1, 8).join("") + "1";
          setQuotient(quotientTemp);
          setSecondCurr(quotientTemp);
        }
      }

      //step three
      if (steps === 3) {
        setListOfAction([...listOfAction, "3: Shift right Divisor"]);
        setActionCurr("Shift right divisor");
        divisorTemp.reverse();

        //shift right mplier, reset steps
        divisorTemp = "0" + divisorTemp.slice(0, 15).join("");
        setDivisor(divisorTemp);
        setFirstCurr(divisorTemp);
        step = 0;
        setTableStep([...tableStep]);
      }
      setSteps(step + 1);
    }
    //next iteration
    setIteration(iteration + 1);
  }

  function Finsish() {
    let k = i;
    setI(k + 1);
  }

  //visual representation
  return (
    //   let Q = "00000000 ";
    // let D = "0001110100000000";
    // let R

    <div className="mainD">
      <table>
        {/* headers and initial values */}
        <th className="headerD">Step</th>
        <th className="headerActionD">Action</th>
        <th className="headerD">Quotient</th>
        <th className="headerD">Divisor</th>
        <th className="headerD">Remainder</th>
        <tr>
          <td className="numberOfStepZeroD">0</td>
          <td className="numberOfStepZeroD">
            <tr className="prodMSBAction">{listOfAction[0]}</tr>
          </td>
          <td className="numberOfStepZeroD">
            <tr className="prodMSB">{listOfQuotient[0]}</tr>
          </td>
          <td className="numberOfStepZeroD">
            <tr className="prodMSB">{listOfDivisor[0]}</tr>
          </td>
          <td className="numberOfStepZeroD">
            <tr className="prodMSB">{R}</tr>
          </td>
        </tr>

        {/* step by step representation */}
        {/* formulas for iteration according to steps -> [step*3-2, step*3-1, step*3] */}
        {tableStep.map((item, index) => {
          msbR = listOfRemainder[item * 3 - 2];

          return (
            <tr>
              {/* step */}
              <td className="numberOfStepSD">{item}</td>

              {/* action */}
              <td className="numberOfStepD">
                <p>
                  <tr className="prodMSBAction">
                    <div>{listOfAction[item * 3 - 2]}</div>
                  </tr>
                </p>
                <p>
                  <tr className="prodMSBAction">
                    <div>{listOfAction[item * 3 - 1]}</div>
                  </tr>
                </p>
                <tr className="prodMSBAction">
                  <div>{listOfAction[item * 3]}</div>
                </tr>
              </td>

              {/* quotient */}
              <td className="numberOfStepD">
                <p>
                  <tr className="prodMSB">
                    <div>{listOfQuotient[item * 3 - 2]}</div>
                  </tr>
                </p>
                <p>
                  <tr
                    className={
                      listOfAction[item * 3 - 1] !== "2b: Rem<0, R+D , Q<<" ||
                      listOfAction[item * 3 - 1] !== "2a:Rem >= 0, Q<<,Q0 = 1"
                        ? "ActiveD"
                        : "prodMSB"
                    }
                  >
                    <div>{listOfQuotient[item * 3 - 1]}</div>
                  </tr>
                </p>
                <tr className="prodMSB">
                  <div>{listOfQuotient[item * 3]}</div>
                </tr>
              </td>

              {/* divisor */}
              <td className="numberOfStepD">
                <p>
                  <tr className="prodMSB">
                    <div>{listOfDivisor[item * 3 - 2]}</div>
                  </tr>
                </p>
                <p>
                  <tr className="prodMSB">
                    <div>{listOfDivisor[item * 3 - 1]}</div>
                  </tr>
                </p>
                <tr
                  className={
                    listOfAction[item * 3] === "3: Shift right Divisor"
                      ? "ActiveD"
                      : "prodLSB"
                  }
                >
                  <div>{listOfDivisor[item * 3]}</div>
                </tr>
              </td>

              {/* remainder */}
              <td className="numberOfStepD">
                <p>
                  <tr className="ActiveD">
                    <div className="divForMsb">
                      {msbR !== undefined
                        ? msbR.split("").map((item, index) => {
                            if (index != 0) {
                              return <div>{item}</div>;
                            } else {
                              return <div className="MSB">{item}</div>;
                            }
                          })
                        : null}
                    </div>
                  </tr>
                </p>
                <p>
                  <tr
                    className={
                      listOfAction[item * 3 - 1] === "2b: Rem<0, R+D , Q<<"
                        ? "ActiveD"
                        : "prodMSB"
                    }
                  >
                    {listOfRemainder[item * 3 - 1]}
                  </tr>
                </p>
                <tr className="prodMSB">
                  <div>{listOfRemainder[item * 3]}</div>
                </tr>
              </td>
            </tr>
          );
        })}
      </table>

      {/* basic representation with Next button */}
      <div className="prdBtnD">
        {/* <h1>Operation: {listOfAction[listOfAction.length - 1]}</h1>
        <h1>Quotient: {quotient}</h1>
        <h1>Divisor: {divisor}</h1>
        <h1>Remainder: {remainder}</h1> */}
        <SchemaD />
        {iteration > 27 ? (
          <Link className="homeLink" to="/">
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
    // <div>
    //   Iteracija: {iteration} <br />
    //   <br />
    //   step:{tableStep} <br />
    //   <br />
    //   quotient:{quotient} <br /> <br />
    //   divisor:{divisor} <br /> <br />
    //   remainder:{remainder} <br />
    //   <br />
    //   <br />
    //   <br />
    //   {listOfAction[iteration - 1]}
    //   <button onClick={Step}>Next</button>
    // </div>
  );
};

export default Divider;
