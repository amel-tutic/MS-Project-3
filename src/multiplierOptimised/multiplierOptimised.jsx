import React, { useEffect } from "react";
import { useState } from "react";
import Multiplier from "../multiplier/multiplier";
import "./style.css"
const MultiplierOptimised = () =>{
    const [mplier, setMplier] = useState( "00011001");
    const [mcand, setMcand] = useState("00000010");
    const [prod, setProd] = useState("00000000");
    const [steps, setSteps] = useState(1)
    const [iteration, setIteration] = useState(1)
    const [prodMplier, setProdMplier] = useState("")
    const [tableStep, setTableStep] = useState([])
    const [listOfProdMplier, setListOfProdMplier] = useState(["0000000000011001"])
    const [listOfMcand, setListOfMcand] = useState(["00000010"])
    const [listOfAction,setListOfAction]=useState(['Initial values'])


    
   

    useEffect(()=>{ 
        setListOfProdMplier([...listOfProdMplier,prodMplier])

        setListOfMcand([...listOfMcand,mcand])
        if(iteration % 2 === 0){
        setTableStep([...tableStep,iteration/2])
        
        }},[iteration])

   

    

        
    


    useEffect(() => {setProdMplier(prod + mplier)}, [])
   

    let step = steps;
    
    
    
    function Step (){
        if(iteration <=16){
        console.log(iteration)

        let mplierTemp = mplier; 
        let mcandTemp = mcand; 
        let prodTemp = prod; 
        let carry = 0;
        let carryTemp = 0;
        
        mcandTemp = mcandTemp.split("");
        mcandTemp.reverse();

        prodTemp = prodTemp.split("");
        prodTemp.reverse();

        if(steps === 1){
            if(prodMplier[15]==="0")
            setListOfAction([...listOfAction,'No operation (LSB = 0)'])
            
        else
        {
            setListOfAction([...listOfAction,'Prod = Prod + Mcand (LSB = 1)'])
            prodTemp = prodTemp.map((item, index) => 
            { 
                carry = carryTemp
                carryTemp = 0;

                if(carry===0)
                
                {
                  if(mcandTemp[index]==="0"){
                    return item;
                  }
                  else if(item==="0"){
                    return mcandTemp[index];
                  }
                  else {
                    carryTemp=1;
                    return item = "0"
                  }
                }
                
                else if(carry===1)
                {
                    

                    if(mcandTemp[index]==="0" && item==="0")
                     {
                        return "1";
                      }
                      else if((mcandTemp[index]==="0" && item==="1") ||( mcandTemp[index]==="1" && item==="0"))
                      {
                        carryTemp = 1
                        return "0";
                      }
                      else {
                        carryTemp = 1
                        return item = "1"
                      }
                    }
                   
            })
            
            setProdMplier(prodTemp.reverse().join("") + mplier);

        }

        
    }
    
        if(steps === 2){
           setListOfAction([...listOfAction,'Rshift Prod/Mplier'])
          let prodMplierTemp = prodMplier.split("");
          prodMplierTemp =  "0" + prodMplierTemp.slice(0,15).join("");
          setMplier(prodMplierTemp.slice(8));
          setProd(prodMplierTemp.slice(0,8))
          setProdMplier(prodMplierTemp);
        step = 0;
        
        }
        setSteps(step+1)



        
        
        
    }
    if(iteration < 17){

    setIteration(iteration+1)
    }
}
    
    return (<div className="main">

               <table>
                 <th>Step</th>
                 <th>Action</th>
                 <th>Mcand</th>
                 <th>Prod/Mplier</th>
                 <tr>
                    <td className="numberOfStep">0</td>
                    <td className="numberOfStep"><tr>{listOfAction[0]}</tr></td>
                    <td className="numberOfStep"><tr>{listOfMcand[0]}</tr></td>
                    <td className="numberOfStep"><tr>{listOfProdMplier[0]}</tr></td>
                 </tr>
                    {tableStep.map((item, index) => {
                                return <tr>
                                    <td className="numberOfStep">{item}</td>
                                    <td className="numberOfStep"><tr>{listOfAction[(item*2)-1]}</tr><tr>{listOfAction[item*2]}</tr></td>
                                    <td className="numberOfStep"><tr>{listOfMcand[(item*2)-1]}</tr><tr>{listOfMcand[item*2]}</tr></td>
                                    <td className="numberOfStep"><tr>{listOfProdMplier[(item*2)-1]}</tr><tr>{listOfProdMplier[item*2]}</tr></td>
                                    
                                </tr>
                                })}
                    
                    
                 
                 
               </table>





               {/* 
                        </div>
                        <div className="mcand">
                            <div className="header"><h3>Multiplicand</h3>
                            </div>
                            {listOfMcand.map((item, index) => {
                                return <div key={index}>{item}</div>
                            })}
                        </div>
                        <div className="prodMul">
                            <div className="header"><h3>Product/Multiplier</h3></div>
                            {listOfProdMplier.map((item, index) => {
                                return <div key={index}>{item}</div>
                            })}
                        </div>
                   
               </div> */}
<br />
<br />
<br />






<br />
             {prodMplier}
        <br />
            {tableStep.join("")}
            
        <br />
             {mcand} 
        <br />
            
        <button onClick={Step}>Next</button>   
             
    </div>)
}

export default MultiplierOptimised;

