import React, { useEffect, useState } from "react";
import "./schemaMO.css";
import { MyContext } from "../../simpleContext";
import { useContext } from "react";
import { act } from "react-dom/test-utils";

const SchemaMO = () => {
  const { firstCurr, secondCurr, prodCurr, actionCurr, currIteration } =
    useContext(MyContext);
  let pr = prodCurr;
  pr = pr.split("");
  let LSB = pr[pr.length - 1];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="844"
      height="540"
      viewBox="0 0 844 540"
      fill="none"
    >
      <rect
        x="235"
        y="42"
        width="310"
        height="65"
        stroke="white"
        stroke-width="2"
      />
      <text x="330" y="65" className="TextMO" fill="white">
        Multiplicand
      </text>{" "}
      <text
        className={actionCurr === "Prod = Prod + Mcand" ? "valRedMO" : "valMO"}
        x="360"
        y="91"
        fill="white"
      >
        {secondCurr}
      </text>
      {/* product */}
      <rect
        className={
          actionCurr === "Prod = Prod + Mcand" ||
          actionCurr === "Rshift Prod/Mplier"
            ? "controlTestGreenMO"
            : "controlTestWhiteMO"
        }
        x="171"
        y="399"
        width="348"
        height="62"
        stroke="white"
        stroke-width="2"
      />
      <text className="TextMO" x="281" y="420" fill="white">
        Product
      </text>
      <text
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "valBlackMO"
            : actionCurr === "Rshift Prod/Mplier"
            ? "valGreenMO"
            : ".valMO"
        }
        fill="white"
        x="283"
        y="450"
      >
        {prodCurr}
      </text>
      <text
        className={
          actionCurr === "Rshift Prod/Mplier"
            ? "controlTestGreenMO"
            : "controlTestWhiteMO"
        }
        x="473"
        y="425"
      >
        Rshift
      </text>
      <text
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestBlackMO"
            : "controlTestWhiteMO"
        }
        x="473"
        y="450"
      >
        Write
      </text>
      {/* control test */}
      <path
        className={
          actionCurr === "No operation"
            ? "controlTestRedMO"
            : "controlTestGreenMO"
        }
        d="M777 430C777 439.854 768.07 449.109 752.84 455.958C737.705 462.764 716.726 467 693.5 467C670.274 467 649.295 462.764 634.16 455.958C618.93 449.109 610 439.854 610 430C610 420.146 618.93 410.891 634.16 404.042C649.295 397.236 670.274 393 693.5 393C716.726 393 737.705 397.236 752.84 404.042C768.07 410.891 777 420.146 777 430Z"
        stroke-width="2"
      />
      <text className="TextMO" x="633" y="433" fill="white">
        Control test
      </text>
      {/* ALU */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestGreenMO"
            : "controlTestWhiteMO"
        }
        d="M276.456 168H117L228.069 272H367.731L481 168H318.245L298.45 185.062L276.456 168Z"
        stroke="black"
        stroke-width="2"
      />
      {actionCurr === "Rshift Prod/Mplier" &&
      LSB === "0" &&
      currIteration !== 17 ? (
        <text className="valRedMO" x="667" y="412" fill="white">
          LSB = 0
        </text>
      ) : actionCurr === "Rshift Prod/Mplier" &&
        LSB === "1" &&
        currIteration !== 17 ? (
        <text className="valGreenMO" x="667" y="412" fill="white">
          LSB = 1
        </text>
      ) : actionCurr === "initial values" && LSB === "1" ? (
        <text className="valGreenMO" x="667" y="412" fill="white">
          LSB = 1
        </text>
      ) : actionCurr === "initial values" && LSB === "0" ? (
        <text className="valRedMO" x="667" y="412" fill="white">
          LSB = 0
        </text>
      ) : null}
      {actionCurr === "Prod = Prod + Mcand" ? (
        <text className="valBlackMO" x="215" y="230">
          Prod
        </text>
      ) : null}
      {actionCurr === "Prod = Prod + Mcand" ? (
        <text fill="white" x="257" y="230">
          =
        </text>
      ) : null}
      {actionCurr === "Prod = Prod + Mcand" ? (
        <text fill="white" x="315" y="230">
          +
        </text>
      ) : null}
      {actionCurr === "Prod = Prod + Mcand" ? (
        <text className="valOrangeMO" x="275" y="230">
          Prod
        </text>
      ) : null}
      {actionCurr === "Prod = Prod + Mcand" ? (
        <text className="valRedMO" x="330" y="230">
          Mcand
        </text>
      ) : null}
      {actionCurr !== "Prod = Prod + Mcand" ? (
        <text className="valMO" fill="white" x="250" y="230">
          No operation
        </text>
      ) : null}
      {/* linija od mcand ka alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestRedMO"
            : "controlTestWhiteMO"
        }
        d="M391 167V108"
        stroke-width="3"
      />
      {/* strelica od mcand to alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand" ? "arrowsRedMO" : "arrowsWhiteMO"
        }
        d="M390.999 167.097L383.303 158.013L398.891 158.181L390.999 167.097Z"
      />
      {/* strelica od prod ka alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "arrowsOrangeMO"
            : "arrowsWhiteMO"
        }
        d="M203.999 167.097L196.303 158.013L211.891 158.181L203.999 167.097Z"
      />
      {/* strelica od alu ka prod */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "arrowsBlackMO"
            : "arrowsWhiteMO"
        }
        d="M297.999 394.097L290.303 385.013L305.891 385.181L297.999 394.097Z"
      />
      {/* strelica od control test ka prod u write */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "arrowsGreenMO"
            : "arrowsWhiteMO"
        }
        d="M520 446L529 438.206V453.794L520 446Z"
      />
      {/* strelica od kontorl test ka alu*/}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "arrowsGreenMO"
            : "arrowsWhiteMO"
        }
        d="M429 220L438 212.206V227.794L429 220Z"
      />
      {/* strelica od control test ka prod u RSHIFT */}
      <path
        className={
          actionCurr === "Rshift Prod/Mplier"
            ? "arrowsGreenMO"
            : "arrowsWhiteMO"
        }
        d="M520 420L529 412.206V427.794L520 420Z"
      />
      {/* strelica iznad prod oznacava da se sifta */}
      <path
        className={
          actionCurr === "Rshift Prod/Mplier"
            ? "arrowsGreenMO"
            : "arrowsWhiteMO"
        }
        d="M399 383L390 390.794V375.206L399 383Z"
      />
      {/* strelica od prod ka kontrol testu */}
      <path
        className={
          actionCurr === "initial values" && LSB === "0" && currIteration !== 17
            ? "arrowsRedMO"
            : actionCurr === "initial values" &&
              LSB === "1" &&
              currIteration !== 17
            ? "arrowsGreenMO"
            : actionCurr === "Rshift Prod/Mplier" &&
              LSB === "0" &&
              currIteration !== 17
            ? "arrowsRedMO"
            : actionCurr === "Rshift Prod/Mplier" &&
              LSB === "1" &&
              currIteration !== 17
            ? "arrowsGreenMO"
            : "arrowsWhiteMO"
        }
        d="M694 468L701.794 477H686.206L694 468Z"
      />
      {/* linija od prod ka alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestOrangeMO"
            : "controlTestWhiteMO"
        }
        d="M248 462V499H60V115H204V163"
        stroke-width="3"
      />
      {/* linija od alu ka prod */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestBlackMO"
            : "controlTestWhiteMO"
        }
        d="M298 273V392"
        stroke-width="3"
      />
      {/* linija od prod ka control test */}
      <path
        className={
          actionCurr === "initial values" && LSB === "0" && currIteration !== 17
            ? "controlTestRedMO"
            : actionCurr === "initial values" &&
              LSB === "1" &&
              currIteration !== 17
            ? "controlTestGreenMO"
            : actionCurr === "Rshift Prod/Mplier" &&
              LSB === "0" &&
              currIteration !== 17
            ? "controlTestRedMO"
            : actionCurr === "Rshift Prod/Mplier" &&
              LSB === "1" &&
              currIteration !== 17
            ? "controlTestGreenMO"
            : "controlTestWhiteMO"
        }
        d="M435.5 463V500H693.5V476.5"
        stroke="black"
        stroke-width="3"
      />
      {/* Linija od kontrol test ka alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestGreenMO"
            : "controlTestWhiteMO"
        }
        d="M683 394V220H435"
        stroke="black"
        stroke-width="3"
      />
      {/* linija od kontrol test ka prod  Rshift OVDE LSB LSB LSB LSB*/}
      <path
        className={
          actionCurr === "Rshift Prod/Mplier"
            ? "controlTestGreenMO"
            : "controlTestWhiteMO"
        }
        d="M614 420H526"
        stroke="black"
        stroke-width="3"
      />
      {/* linija od kontrol test ka prod u write */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestGreenMO"
            : "controlTestWhiteMO"
        }
        d="M617 446H527"
        stroke="black"
        stroke-width="3"
      />
      {/* // Prod = Prod + Mcand//No operation//Rshift Prod/Mplier //initial values*/}
      {/* strelica iznad product pokazuje da se sifta prod */}
      <path
        className={
          actionCurr === "Rshift Prod/Mplier"
            ? "controlTestGreenMO"
            : "controlTestWhiteMO"
        }
        d="M334 383H390.5"
        stroke="black"
        stroke-width="3"
      />
    </svg>
  );
};

export default SchemaMO;
