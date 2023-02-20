import React, { useEffect } from "react";
import { useState } from "react";
import "./divO.css";

//define multiplierOptimised
const DividerOptimised = () => {
  let Q = "10000111";
  let D = "00100111";
  let R = "00000000";
  let RQ = R + Q;
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
  const [reminder, setReminder] = useState(R);
  const [RemQuo, setRemQuo] = useState(RQ);
  const [steps, setSteps] = useState(1);
  const [iteration, setIteration] = useState(1);
  const [tableStep, setTableStep] = useState([]);
  const [listOfDivisor, setListOfDivisor] = useState([]);
  const [listOfRemQuo, setListOfRemQuo] = useState([]);
  const [listOfAction, setListOfAction] = useState(["Initial values"]);
  let lsbRQ = "";
  //define iteration effect
  useEffect(() => {
    setListOfRemQuo([...listOfRemQuo, RemQuo]);
    setListOfDivisor([...listOfDivisor, divisor]);

    if ((iteration + 1) % 3 === 0 && iteration <= 24) {
      setTableStep([...tableStep, (iteration + 1) / 3]);
    }
  }, [iteration]);

  //define effect for prod and mplier concatenation
  useEffect(() => {
    setRemQuo(reminder + quotient);
  }, []);

  //helper for reseting steps
  let step = steps;

  //function for a whole step
  function Step() {
    if (iteration <= 24) {
      console.log(iteration);

      let divisorTemp = divisor;
      let reminderTemp = reminder;

      let carry = 0;
      let carryTemp = 0;

      //split & reverse for bit by bit checking & addition
      divisorTemp = divisorTemp.split("");
      divisorTemp.reverse();
      reminderTemp = reminderTemp.split("");
      reminderTemp.reverse();

      //step one
      if (steps === 1) {
        setListOfAction([...listOfAction, "R<<"]);

        let RemQuoTemp = RemQuo.split("");
        RemQuoTemp = RemQuoTemp.slice(1, 16).join("") + "0";
        setReminder(RemQuoTemp.slice(0, 8));
        setQuotient(RemQuoTemp.slice(8));
        setRemQuo(RemQuoTemp);
      }

      //step two
      if (steps === 2) {
        setListOfAction([...listOfAction, "2: Rem = Rem - Div"]);
        divisorTemp = divisorTemp.map((item) => {
          if (item === "0") {
            return "1";
          } else return "0";
        });

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

        reminderTemp = reminderTemp.map((item, index) => {
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

        //unreverse and join reminder bits
        setReminder(reminderTemp.reverse().join(""));

        setRemQuo(reminderTemp.join("") + quotient);
      }
      if (steps === 3) {
        console.log(reminderTemp);

        if (reminderTemp[7] === "0") {
          setListOfAction([...listOfAction, "R>0 , R0 = 1"]);
          let RemQuoTemp = RemQuo;
          RemQuoTemp = RemQuoTemp.split("").reverse();
          RemQuoTemp[0] = "1";
          setRemQuo(RemQuoTemp.reverse().join(""));
        } else {
          setListOfAction([...listOfAction, "R<0 , R + D"]);
          reminderTemp = reminderTemp.map((item, index) => {
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
          reminderTemp = reminderTemp.reverse().join("");
          setReminder(reminderTemp);
          setRemQuo(reminderTemp + quotient);
        }
        step = 0;
      }
      setSteps(step + 1);
    }
    //next iteration
    if (iteration <= 24) {
      setIteration(iteration + 1);
    }
  }

  //visual representation
  return (
    <div className="mainDO">
      <table>
        {/* headers and initial values */}
        <th className="headerDO">Step</th>
        <th className="headerActionDO">Action</th>
        <th className="headerDO">Divisor</th>
        <th className="headerDO">Reminder/Quotient</th>
        <tr>
          <td className="numberOfStepZeroDO">0</td>
          <td className="numberOfStepZeroDO">
            <tr className="prodMSBAction">{listOfAction[0]}</tr>
          </td>
          <td className="numberOfStepZeroDO">
            <tr className="prodMSB">{listOfDivisor[0]}</tr>
          </td>
          <td className="numberOfStepZeroDO">
            <tr className="prodMSB">
              {RQ.split("").map((item, index) => {
                if (index != 0) {
                  return <div>{item}</div>;
                } else {
                  return <div className="MSB">{item}</div>;
                }
              })}
            </tr>
          </td>
        </tr>

        {/* step by step representation */}
        {/* formulas for iteration according to steps -> [step*2-1, step*2] */}
        {tableStep.map((item, index) => {
          lsbRQ = listOfRemQuo[item * 3 - 1];

          return (
            <tr>
              <td className="numberOfStepSDO">{item}</td>
              <td className="numberOfStepDO">
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
              <td className="numberOfStepDO">
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
                <tr className="prodMSB">
                  <div>{listOfDivisor[item * 3]}</div>
                </tr>
              </td>
              <td className="numberOfStepDO">
                <p>
                  <tr className="prodMSB">
                    <div>{listOfRemQuo[item * 3 - 2]}</div>
                  </tr>
                </p>
                <p>
                  <tr className="prodMSB">
                    {lsbRQ !== undefined
                      ? lsbRQ.split("").map((item, index) => {
                          if (index != 0) {
                            return <div>{item}</div>;
                          } else {
                            return <div className="MSB">{item}</div>;
                          }
                        })
                      : null}
                  </tr>
                </p>
                <tr
                  className={
                    listOfAction[item * 3] === "R>0 , R0 = 1"
                      ? "ActiveDO"
                      : "prodMSB"
                  }
                >
                  <div>{listOfRemQuo[item * 3]}</div>
                </tr>
              </td>
            </tr>
          );
        })}
      </table>

      {/* basic representation with Next button */}
      <div className="prdBtnDO">
        <h1>Operation: {listOfAction[listOfAction.length - 1]}</h1>
        <h1>Divisor: {divisor}</h1>
        <h1>Reminder/Quotient: {RemQuo}</h1>
        <button onClick={Step}>Next</button>
      </div>
    </div>
  );
};

export default DividerOptimised;
