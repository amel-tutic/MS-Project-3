import React, { useEffect, useState } from "react";
import "./schemaD.css";
import { MyContext } from "../../simpleContext";
import { useContext } from "react";

const SchemaD = () => {
    const { firstCurr, secondCurr, prodCurr, actionCurr } = useContext(MyContext);
    let remainder = prodCurr;
    remainder = remainder.split("");
    let MSB = remainder[0];

    const [prods, setProds] = useState([prodCurr]);
    useEffect(() => {
      setProds([...prods, prodCurr]);
    }, [prodCurr]);

    return(

<svg xmlns="http://www.w3.org/2000/svg" width="844" height="540" viewBox="0 0 844 540" fill="none">

{/* actions { Rem = Rem - Div , Rem<0 , Rem>=0 , Shift right divisor  } */}

 {/* divisor */}
<rect className={
          actionCurr === "Shift right divisor"
            ? "controlTestGreenD"
            : "controlTestWhiteD"
        }
         x="235" y="42" width="310" height="65" stroke="white" stroke-width="2"/>

{/* quotient */}
<rect className={
          actionCurr === "Rem<0" || actionCurr === "Rem>=0"
            ? "controlTestGreenD"
            : "controlTestWhiteD"
        }
         x="614" y="221" width="165" height="74" stroke="white" stroke-width="2"/>

{/* remainder */}
<rect className={
          actionCurr === "Rem = Rem - Div" || actionCurr === "Rem<0" || actionCurr === "Rem>=0"
            ? "controlTestGreenD"
            : "controlTestWhiteD"
        } x="93" y="398" width="310" height="62" stroke="white" stroke-width="2"/>


{/* divisor */}
<text className="TextD" x="360" y="65" fill="white">Divisor</text>
<text className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "valRedD"
    : actionCurr==="Shift right divisor"? "valGreenD"
    : null
} x="325" y="90" fill="white">{firstCurr}</text>
<text className={
    actionCurr === "Shift right divisor"? "controlTestGreenD" : null 
} x="500" y="100" fill="white">Rshift</text>

{/* quotient */}
<text className="TextD" x="655" y="245" fill="white">Quotient</text>
<text className={
    actionCurr === "Rem<0"? "valGreenD"
    : null
} x="663" y="270" fill="white">{secondCurr}</text>
<text className={
    actionCurr === "Rem<0"? "controlTestGreenD"
    : null
} x="735" y="287" fill="white">Lshift</text>

{/* alu */}
<text className="TextD" x="280" y="210" fill="white">ALU</text>

{actionCurr==="Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"?<text className= "valBlackD" x="230" y="240">Rem</text>: null} 
<text  x="270" y="240" fill="white">{actionCurr==="Rem = Rem - Div"|| actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "=" : null}</text>
<text className={actionCurr==="Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "valOrangeD" : null} x="290" y="240">Rem</text>
<text  x="333" y="240" fill="white">{actionCurr==="Rem = Rem - Div"? "-" : actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "+" : null}</text>
<text className={actionCurr==="Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "valRed" : null} x="350" y="240">Div</text>

{/* remainder */}
<text className="TextD" x="200" y="420" fill="white">Remainder</text>
<text className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "valBlackD"
    : null
}  x="185" y="445" fill="white">{prodCurr}</text>
<text className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0" ? "valBlackD"
    : null
} x="360" y="453" fill="white">Write</text>

{/* control */}
<text className="valD" x="520" y="403" fill="white">Control test</text>
<text x="543" y="425" fill="white">{
    actionCurr === "Rem = Rem - Div" ? "Step 1"
    : actionCurr === "Rem<0"? "Step 2"
    : actionCurr === "Rem>=0"? "Step 2"
    : actionCurr === "Shift right divisor"? "Step 3"
    : null
}</text>

{/* msb */}
{actionCurr === "Rem = Rem - Div"?
<text className={
    actionCurr === "Rem = Rem - Div"? (MSB != 0? "valGreenD" : "valRedD") : null
 } x="543" y="382" fill="white">MSB = {MSB}</text>
: null}

{/* control test */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"
     || actionCurr==="Shift right divisor"? "controlTestGreenD"
    : null
} d="M648 399C648 408.854 639.07 418.109 623.84 424.958C608.705
 431.764 587.726 436 564.5 436C541.274 436 520.295 431.764 505.16
  424.958C489.93 418.109 481 408.854 481 399C481 389.146 489.93 
  379.891 505.16 373.042C520.295 366.236 541.274 362 564.5 362C587.726
   362 608.705 366.236 623.84 373.042C639.07 379.891 648 389.146 648 399Z" stroke="white" stroke-width="2"/>

{/* alu */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "controlTestGreenD"
    : null
} d="M276.456 168H117L228.069 272H367.731L481 168H318.245L298.45 185.062L276.456 168Z"
 stroke="white" stroke-width="2"/>


{/* line from divisor to alu */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "controlTestRedD" 
    : null   
} d="M391 167V108" stroke="white" stroke-width="3"/>
    
{/* arrow from divisor to alu */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "arrowsRedD"
    : null
} d="M390.999 167.097L383.303 158.013L398.891 158.181L390.999 167.097Z" fill="white"/>

{/* line from control to remainder */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "controlTestGreenD"
    : null
} d="M415 450H509V426" stroke="white" stroke-width="3"/>

{/* arrow from control to remainder */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "arrowsGreenD"
    : null
} d="M404 449L413 441.206V456.794L404 449Z" fill="white"/>

{/* line from control to quotient */}
<path className={
    actionCurr === "Rem<0" || actionCurr==="Rem>=0"? "controlTestGreenD"
    : null
} d="M644 413H823V281H784" stroke="white" stroke-width="3"/>

{/* arrow from control to quotient */}
<path className={
    actionCurr === "Rem<0" || actionCurr==="Rem>=0"? "controlTestGreenD"
    : null
} d="M780 281L789 273.206V288.794L780 281Z" fill="white"/>

{/* line from control to alu */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "controlTestGreenD"
    : null
} d="M515 367V216H435" stroke="white" stroke-width="3"/>

{/* arrow from control to alu */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "arrowsGreenD"
    : null
} d="M433 216L442 208.206V223.794L433 216Z" fill="white"/>

{/* line from remainder to control */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "controlTestGreenD"
    : null
} d="M252 462.296V499H562V437" stroke="white" stroke-width="3"/>

{/* arrow from remainder to control */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "arrowsGreenD"
    : null
} d="M562 437L569.794 446H554.206L562 437Z" fill="white"/>

{/* line from remainder to alu */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "controlTestOrangeD"
    : null
} d="M248 462V499H60V115H204V163" stroke="white" stroke-width="3"/>

{/* arrow from remainder to alu */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "arrowsOrangeD"
    : null
} d="M203.999 167.097L196.303 158.013L211.891 158.181L203.999 167.097Z" fill="white"/>

{/* product that goes into subtraction */}
<text x="65" y="108" fill="orange">{actionCurr==="Rem = Rem - Div"
 || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? prods[prods.length - 2] : null}</text>

{/* line from alu to remainder */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "controlTestBlackD"
    : null
} d="M298 273V392" stroke="white" stroke-width="3"/>

{/* arrow from alu to remainder */}
<path className={
    actionCurr === "Rem = Rem - Div" || actionCurr==="Rem<0" || actionCurr==="Rem>=0"? "arrowsBlackD"
    : null
} d="M297.999 394.097L290.303 385.013L305.891 385.181L297.999 394.097Z" fill="white"/>

{/* line from control to divisor */}
<path className={
    actionCurr === "Shift right divisor"? "controlTestGreenD" : null 
} d="M572 360V94H551" stroke="white" stroke-width="3"/>

{/* arrow from control to divisor */}
<path className={
    actionCurr === "Shift right divisor"? "arrowsGreenD" : null 
} d="M546 95L555 87.2058V102.794L546 95Z" fill="white"/>


{/* shift right line */}
<path className={
    actionCurr === "Shift right divisor"? "controlTestGreenD" : null 
} d="M350 26H424" stroke="white" stroke-width="3"/>

{/* shift right arrow */}
<path className={
    actionCurr === "Shift right divisor"? "arrowsGreenD" : null 
} d="M433 26L424 33.7942V18.2058L433 26Z" fill="white"/>

{/* shift left line */}
<path className={
    actionCurr === "Rem<0" || actionCurr==="Rem>=0"? "valGreenD"
    : null
} d="M661 207H735" stroke="white" stroke-width="3"/>

{/* shift left arrow */}
<path className={
    actionCurr === "Rem<0" || actionCurr==="Rem>=0"? "valGreenD"
    : null
} d="M655 207L664 199.206V214.794L655 207Z" fill="white"/>

</svg>
    )
}

export default SchemaD;