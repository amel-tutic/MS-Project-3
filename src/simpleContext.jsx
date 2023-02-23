import React, { useState } from "react";

export const MyContext = React.createContext();

//define context
const SimpleContext = (props) => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [firstCurr, setFirstCurr] = useState("");
  const [secondCurr, setSecondCurr] = useState("");
  const [prodCurr, setProdCurr] = useState("");
  const [actionCurr, setActionCurr] = useState("");

  return (
    <MyContext.Provider
      value={{
        first,
        setFirst,
        second,
        setSecond,
        firstCurr,
        setFirstCurr,
        secondCurr,
        setSecondCurr,
        prodCurr,
        setProdCurr,
        actionCurr,
        setActionCurr,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default SimpleContext;
