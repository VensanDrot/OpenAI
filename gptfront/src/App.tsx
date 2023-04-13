import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefGPT from "./Pages/DefGPT";
import NewProject from "./Pages/NewProject";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/GPT" element={<DefGPT />} />
          <Route path="/" element={<NewProject />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
