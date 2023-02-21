import React from "react";
import MultiplierOptimised from "./multiplierOptimised/multiplierOptimised";
import Multiplier from "./multiplier/multiplier";
import Divider from "./divider/divider";
import Home from "./home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DividerOptimised from "./dividerOptimised/dividerOptimised";
import InsertForMultiplier from "./multiplier/insertForMultiplier";
import InsertForMultiplierOptimised from "./multiplierOptimised/insertForMultiplierOptimised";
import InsertForDivider from "./divider/insertForDivider";
import InsertForDividerOptimised from "./dividerOptimised/insertForDividerOptimised";
import SimpleContext from "./simpleContext";
function App() {
  return (
    <div className="App">
      <SimpleContext>
        <BrowserRouter>
          <Routes>
            <Route
              path="/insertForMultiplier/multiplier"
              element={<Multiplier />}
            />

            <Route
              path="/insertForMultiplier"
              element={<InsertForMultiplier />}
            />

            <Route
              path="/insertForMultiplierOptimised/multiplierOptimised"
              element={<MultiplierOptimised />}
            />

            <Route
              path="/insertForMultiplierOptimised"
              element={<InsertForMultiplierOptimised />}
            />
            <Route path="/insertForDivider" element={<InsertForDivider />} />

            <Route path="/" element={<Home />} />

            <Route path="/insertForDivider/divider" element={<Divider />} />

            <Route
              path="/insertForDividerOptimised"
              element={<InsertForDividerOptimised />}
            />
            <Route
              path="/insertForDividerOptimised/dividerOptimised"
              element={<DividerOptimised />}
            />
          </Routes>
        </BrowserRouter>
      </SimpleContext>
    </div>
  );
}

export default App;
