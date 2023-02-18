import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const Multiplier = () => {
  let Ml = "10000000";
  let Mc = "0000000000000001";
  let P = "0000000000000000";
  const [mplier, setMplier] = useState(Ml);
  const [mcand, setMcand] = useState(Mc);
  const [prod, setProd] = useState(P);
  const [steps, setSteps] = useState(1);
  const [iteration, setIteration] = useState(1);
  const [listOfMplier, setListOfMplier] = useState([]);
  const [listOfMcand, setListOfMcand] = useState([]);
  const [listOfProd, setListOfProd] = useState([]);
  const [fields, setFields] = useState([]);
  const [listOfAction, setListOfAction] = useState(["Initial values"]);
  useEffect(() => {
    if (iteration !== 0) {
      setListOfProd([...listOfProd, prod]);
      setListOfMcand([...listOfMcand, mcand]);
      setListOfMplier([...listOfMplier, mplier]);
    }
    if ((iteration + 1) % 3 === 0 && iteration < 25) {
      setFields([...fields, (iteration + 1) / 3]);
    }
  }, [iteration]);

  let step = steps;

  function Step() {
    if (iteration <= 24) {
      console.log(iteration);

      let mplierTemp = mplier;
      let mcandTemp = mcand;
      let prodTemp = prod;
      let carry = 0;
      let carryTemp = 0;
      mplierTemp = mplierTemp.split("");
      mcandTemp = mcandTemp.split("");
      mcandTemp.reverse();
      prodTemp = prodTemp.split("");
      prodTemp.reverse();
      if (steps === 1) {
        if (mplierTemp[7] === "1") {
          setListOfAction([...listOfAction, "1a: Prod = Prod + Mcand (LSB=1)"]);
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
          setProd(prodTemp.reverse().join(""));
        } else {
          setListOfAction([...listOfAction, "1b: No operation (LSB=0)"]);
        }
      }
      if (steps === 2) {
        setListOfAction([...listOfAction, "2: Shif left Multiplicand"]);

        mcandTemp.reverse();
        mcandTemp = mcandTemp.slice(1).join("") + "0";
        setMcand(mcandTemp);
      }
      if (steps === 3) {
        setListOfAction([...listOfAction, "3: Shif right Multiplier"]);
        mplierTemp = "0" + mplierTemp.slice(0, 7).join("");
        setMplier(mplierTemp);
        step = 0;
        setFields([...fields]);
      }
      setSteps(step + 1);
    }
    setIteration(iteration + 1);
  }

  return (
    <div className="mainM">
      <table>
        <th className="headerM">Iteration</th>
        <th className="headerActionM">Step</th>
        <th className="headerM">Mplier</th>
        <th className="headerM">Mcand</th>
        <th className="headerM">Prod</th>
        <tr>
          <td className="numberOfStepS">0</td>
          <td className="numberOfStepM">
            <tr>{listOfAction[0]}</tr>
          </td>
          <td className="numberOfStepM">
            <tr>{Ml}</tr>
          </td>
          <td className="numberOfStepM">
            <tr>{Mc}</tr>
          </td>
          <td className="numberOfStepM">
            <tr>{P}</tr>
          </td>
        </tr>
        {fields.map((item, index) => {
          return (
            <tr>
              <td className="numberOfStepS">{item}</td>
              <td className="numberOfStepM">
                <tr className="Row">{listOfAction[item * 3 - 2]}</tr>
                <tr>{listOfAction[item * 3 - 1]}</tr>
                <tr>{listOfAction[item * 3]}</tr>
              </td>
              <td className="numberOfStepM">
                <tr>{listOfMplier[item * 3 - 2]}</tr>
                <tr>{listOfMplier[item * 3 - 1]}</tr>
                <tr>{listOfMplier[item * 3]}</tr>
              </td>
              <td className="numberOfStepM">
                <tr>{listOfMcand[item * 3 - 2]}</tr>
                <tr>{listOfMcand[item * 3 - 1]}</tr>
                <tr>{listOfMcand[item * 3]}</tr>
              </td>
              <td className="numberOfStepM">
                <tr>{listOfProd[item * 3 - 2]}</tr>
                <tr>{listOfProd[item * 3 - 1]}</tr>
                <tr>{listOfProd[item * 3]}</tr>
              </td>
            </tr>
          );
        })}
      </table>
      <div className="prdBtnM">
        <h1> multiplier:{mplier}</h1>
        <br />
        <h1>mcand:{mcand} </h1>
        <br />
        <h1>prod:{prod}</h1>
        <br />
        <button onClick={Step}>Next</button>
      </div>
    </div>
  );
};

export default Multiplier;
