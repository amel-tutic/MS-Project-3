import React, { useEffect, useState } from "react";
import "./schemaM.css";
import { MyContext } from "../../simpleContext";
import { useContext } from "react";

const SchemaM = () => {
  const { firstCurr, secondCurr, prodCurr, actionCurr, currIteration, finish } =
    useContext(MyContext);
  let mplier = firstCurr;
  mplier = mplier.split("");
  let LSB = mplier[mplier.length - 1];

  const [prods, setProds] = useState([prodCurr]);

  useEffect(() => {
    setProds([...prods, prodCurr]);
  }, [prodCurr]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="827"
      height="540"
      viewBox="0 0 844 540"
      fill="none"
    >
      {/* mcand */}
      <rect
        className={
          actionCurr === "Shift left Multiplicand"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        x="235"
        y="42"
        width="310"
        height="65"
        stroke-width="2"
      />
      {/* mplier */}
      <rect
        className={
          actionCurr === "Shift right Multiplier"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        x="614"
        y="221"
        width="165"
        height="74"
        stroke-width="2"
      />
      {/* product */}
      <rect
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        x="93"
        y="398"
        width="310"
        height="62"
        stroke-width="2"
      />
      <text
        // className={
        //   actionCurr === "Prod = Prod + Mcand"
        //     ? "TextRed"
        //     : actionCurr === "Shift left Multiplicand"
        //     ? "TextGreen"
        //     : "TextWhite"
        // }
        className="Text"
        x="328"
        y="65"
        fill="white"
      >
        Multiplicand
      </text>
      <text
        className={
          actionCurr === "Shift left Multiplicand" ? "valGreen" : "valWhite"
        }
        x="475"
        y="103"
        fill="white"
      >
        Shift left
      </text>
      <text
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "valRed"
            : actionCurr === "Shift left Multiplicand"
            ? "valGreen"
            : "valWhite"
        }
        x="313"
        y="85"
        fill="white"
      >
        {secondCurr}
      </text>
      <text className="Text" x="280" y="206" fill="white">
        Alu
      </text>
      {actionCurr === "Prod = Prod + Mcand" ? (
        <text className="valBlack" x="215" y="230">
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
        <text className="valOrange" x="275" y="230">
          Prod
        </text>
      ) : null}
      {actionCurr === "Prod = Prod + Mcand" ? (
        <text className="valRed" x="330" y="230">
          Mcand
        </text>
      ) : null}
      {actionCurr !== "Prod = Prod + Mcand" ? (
        <text className="val" fill="white" x="250" y="230">
          No operation
        </text>
      ) : null}
      <text className="Text" x="210" y="418" fill="white">
        Product
      </text>{" "}
      <text
        className={
          actionCurr === "Prod = Prod + Mcand" ? "valBlack" : "valWhite"
        }
        x="355"
        y="456"
        fill="white"
      >
        Write
      </text>
      <text
        className={actionCurr === "Prod = Prod + Mcand" ? "valBlack" : "val"}
        x="175"
        y="438"
        fill="white"
      >
        {prodCurr}
      </text>
      {actionCurr === "Prod = Prod + Mcand" ? (
        <text className="valOrange" x="60" y="100" fill="white">
          {prods[prods.length - 2]}
        </text>
      ) : null}
      {finish != 1 && currIteration > 24 ? null : actionCurr ===
          "Shift right Multiplier" &&
        LSB === "0" &&
        currIteration != 25 ? (
        <text className="valRed" x="535" y="380" fill="white">
          LSB = 0
        </text>
      ) : actionCurr === "Shift right Multiplier" &&
        LSB === "1" &&
        currIteration != 25 ? (
        <text className="valGreen" x="535" y="380" fill="white">
          LSB = 1
        </text>
      ) : actionCurr === "initial values" && LSB === "1" ? (
        <text className="valGreen" x="535" y="380" fill="white">
          LSB = 1
        </text>
      ) : actionCurr === "initial values" && LSB === "0" ? (
        <text className="valRed" x="535" y="380" fill="white">
          LSB = 0
        </text>
      ) : null}
      <text className="Text" x="505" y="400" fill="white">
        Control test
      </text>
      <text className="val" x="538" y="425" fill="white">
        {actionCurr === "Prod = Prod + Mcand"
          ? "Step1"
          : actionCurr === "No operation"
          ? "Step1"
          : actionCurr === "Shift left Multiplicand"
          ? "Step2"
          : "Step3"}
      </text>
      <text className="Text" x="650" y="245" fill="white">
        Multiplier
      </text>
      <text
        className={actionCurr === "Shift right Multiplier" ? "valGreen" : "val"}
        x="704"
        y="289"
        fill="white"
      >
        Shif right
      </text>
      <text
        className={actionCurr === "Shift right Multiplier" ? "valGreen" : "val"}
        x="660"
        y="265"
        fill="white"
      >
        {firstCurr}
      </text>
      {/* Control text */}
      <path
        className={
          actionCurr === "initial values" && LSB === "1"
            ? "controlTestGreen"
            : actionCurr === "initial values" && LSB === "0"
            ? "controlTestRed"
            : actionCurr === "No operation"
            ? "controlTestRed"
            : "controlTestGreen"
        }
        d="M648 399C648 408.854 639.07 418.109 623.84 424.958C608.705 431.764 587.726 436 564.5 436C541.274 436 520.295 431.764 505.16 424.958C489.93 418.109 481 408.854 481 399C481 389.146 489.93 379.891 505.16 373.042C520.295 366.236 541.274 362 564.5 362C587.726 362 608.705 366.236 623.84 373.042C639.07 379.891 648 389.146 648 399Z"
        stroke-width="2"
      />
      {/* // "Prod = Prod + Mcand" // "No operation" // "Shift left Multiplicand" //
                         "Shift right Multiplier" // controlTestGreen */}
      {/* Alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        d="M276.456 168H117L228.069 272H367.731L481 168H318.245L298.45 185.062L276.456 168Z"
        stroke="white"
        stroke-width="2"
      />
      {/* linija iz kontrol testa u alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        d="M562 437V449H408"
        stroke-width="3"
      />
      {/* linija iz mcand u alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestRed"
            : "controlTestWhite"
        }
        d="M391 167V108"
        stroke-width="3"
      />
      {/* strelica iz mcand u alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand" ? "arrowsRed" : "arrowsWhite"
        }
        d="M390.999 167.097L383.303 158.013L398.891 158.181L390.999 167.097Z"
      />
      {/* strelica iz kontrol testa testa u prod */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand" ? "arrowsGreen" : "arrowsWhite"
        }
        d="M404 449L413 441.206V456.794L404 449Z"
      />
      {/* strelica iz mpliera u control test */}
      <path
        className={
          finish != 1 && currIteration > 24
            ? "arrowsWhite"
            : actionCurr === "Shift right Multiplier" &&
              LSB === "0" &&
              currIteration != 25
            ? "arrowsRed"
            : actionCurr === "Shift right Multiplier" &&
              LSB === "1" &&
              currIteration != 25
            ? "arrowsGreen"
            : actionCurr === "initial values" && LSB === "0"
            ? "arrowsRed"
            : actionCurr === "initial values" && LSB === "1"
            ? "arrowsGreen"
            : "arrowsWhite"
        }
        d="M644 385L653 377.206V392.794L644 385Z"
        fill="black"
      />
      {/* strelica iznad Mcand u control test */}
      <path
        className={
          actionCurr === "Shift left Multiplicand"
            ? "arrowsGreen"
            : "arrowsWhite"
        }
        d="M344 26L353 18.2058V33.7942L344 26Z"
      />
      {/* strelica iznad Mplier */}
      <path
        className={
          actionCurr === "Shift right Multiplier"
            ? "arrowsGreen"
            : "arrowsWhite"
        }
        d="M741 207L732 214.794V199.206L741 207Z"
      />
      {/* strelica koja ulazi u multiplier */}
      <path
        className={
          actionCurr === "Shift right Multiplier"
            ? "arrowsGreen"
            : "arrowsWhite"
        }
        d="M780 281L789 273.206V288.794L780 281Z"
      />
      {/* strelica iz contol text u alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand" ? "arrowsGreen" : "arrowsWhite"
        }
        d="M433 216L442 208.206V223.794L433 216Z"
      />
      {/* strelica iz produc u alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand" ? "arrowsOrange" : "arrowsWhite"
        }
        d="M203.999 167.097L196.303 158.013L211.891 158.181L203.999 167.097Z"
      />
      {/* strelica iz alu u produc */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand" ? "arrowsBlack" : "arrowsWhite"
        }
        d="M297.999 394.097L290.303 385.013L305.891 385.181L297.999 394.097Z"
      />
      {/* linija iz product u alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestOrange"
            : "controlTestWhite"
        }
        d="M248 462V499H60V115H204V163"
        stroke-width="3"
      />
      {/* linija iz control test u mplier */}
      <path
        className={
          actionCurr === "Shift right Multiplier"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        d="M644 413H823V281H784"
        stroke-width="3"
      />
      {/* strelica iz control test u mcand */}
      <path
        className={
          actionCurr === "Shift left Multiplicand"
            ? "arrowsGreen"
            : "arrowsWhite"
        }
        d="M546 95L555 87.2058V102.794L546 95Z"
      />
      {/* linija iz mpliera u control test */}
      <path
        className={
          finish != 1 && currIteration > 24
            ? "controlTestWhite"
            : actionCurr === "Shift right Multiplier" &&
              LSB === "0" &&
              currIteration != 25
            ? "controlTestRed"
            : actionCurr === "Shift right Multiplier" &&
              LSB === "1" &&
              currIteration != 25
            ? "controlTestGreen"
            : actionCurr === "initial values" && LSB === "0"
            ? "controlTestRed"
            : actionCurr === "initial values" && LSB === "1"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        d="M748 296V385H648"
        stroke-width="3"
      />
      {/* linija iz control test u alu */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        d="M515 367V216H435"
        stroke-width="3"
      />
      {/* linija iz control test u mpcand */}
      <path
        className={
          actionCurr === "Shift left Multiplicand"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        d="M572 360V94H551"
        stroke-width="3"
      />
      {/* linija iz alu u product */}
      <path
        className={
          actionCurr === "Prod = Prod + Mcand"
            ? "controlTestBlack"
            : "controlTestWhite"
        }
        d="M298 273V392"
        stroke="black"
        stroke-width="3"
      />
      {/* strelica iznad mcand */}
      <path
        className={
          actionCurr === "Shift left Multiplicand"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        d="M350 26H424"
        stroke="black"
        stroke-width="3"
      />
      {/* strelica iznad mplier */}
      <path
        className={
          actionCurr === "Shift right Multiplier"
            ? "controlTestGreen"
            : "controlTestWhite"
        }
        d="M661 207H735"
        stroke="black"
        stroke-width="3"
      />
    </svg>
  );
};

export default SchemaM;
