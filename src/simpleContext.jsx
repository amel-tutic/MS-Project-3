import React, { useState } from "react";

export const MyContext = React.createContext();

//define context
const SimpleContext = (props) => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  return (
    <MyContext.Provider
      value={{
        first,
        setFirst,
        second,
        setSecond,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default SimpleContext;
