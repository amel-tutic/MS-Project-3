import React from "react";
import MultiplierOptimised from "./multiplierOptimised/multiplierOptimised";
import Multiplier from "./multiplier/multiplier";
import Divider from "./divider/divider";
import Home from "./home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DividerOptimized from "./dividerOptimized/divideroptimized";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/divider" element={<Divider />} />
          <Route path="/dividerOptimized" element={<DividerOptimized />} />
          <Route path="/multiplier" element={<Multiplier />} />
          <Route
            path="/multiplierOptimized"
            element={<MultiplierOptimised />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
