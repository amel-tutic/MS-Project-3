import React from "react";
import MultiplierOptimised from "./multiplierOptimised/multiplierOptimised";
import Multiplier from "./multiplier/multiplier";
import Divider from "./divider/divider";
import Home from "./home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DividerOptimized from "./dividerOptimized/divideroptimized";
import InsertForMultiplier from "./multiplier/insertForMultiplier";
import InsertForMultiplierOptimized from "./multiplierOptimised/insertForMultiplierOptimized";
import InsertForDivider from "./divider/insertForDivider";
import InsertForDividerOptimized from "./dividerOptimized/insertForDividerOptimized";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/multiplier" element={<Multiplier />} />

          <Route
            path="/insertForMultiplier"
            element={<InsertForMultiplier />}
          />

          <Route
            path="/multiplierOptimized"
            element={<MultiplierOptimised />}
          />

          <Route
            path="/insertForMultiplierOptimized"
            element={<InsertForMultiplierOptimized />}
          />
          <Route path="/insertForDivider" element={<InsertForDivider />} />
          <Route
            path="/insertForDividerOptimized"
            element={<InsertForDividerOptimized />}
          />

          <Route path="/" element={<Home />} />

          <Route path="/divider" element={<Divider />} />

          <Route path="/dividerOptimized" element={<DividerOptimized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
