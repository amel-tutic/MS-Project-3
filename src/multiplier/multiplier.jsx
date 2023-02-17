import React from "react";
import { useState } from "react";

const Multiplier = () =>{
    const [mplier, setMplier] = useState( "0010");
    const [mcand, setMcand] = useState("00011001");
    const [prod, setProd] = useState("00000000");
    const [steps, setSteps] = useState(1)
    const [iteration, setIteration] = useState(1)

    let step = steps;
    
    
    
    function Step (){
        if(iteration <=12){
        console.log(iteration)
        
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
        if(steps === 1){
        if(mplierTemp[3]==="1")
        {
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
            setProd(prodTemp.reverse().join(""));


        }}
        if(steps === 2){

        mcandTemp.reverse();
        mcandTemp = mcandTemp.slice(1).join("") + "0";
        setMcand(mcandTemp);
        }
        if(steps === 3){
        
        mplierTemp = "0" + mplierTemp.slice(0,3).join("") 
        setMplier(mplierTemp);
        step = 0
        
        }
        setSteps(step+1)



        
        
        
    }
    setIteration(iteration+1)
    
}
    
    return (<div>
        <br />
             {mplier} multiplier 
        <br />
             {mcand} mcand
        <br />
             {prod}  prod
        <br />
        <button onClick={Step}>Next</button>   
             
    </div>)
}

export default Multiplier;
