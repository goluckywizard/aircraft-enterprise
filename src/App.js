import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import './App.css';
import Stages from "./pages/Stages";
import Manufactures from "./pages/Manufactures";
import TestFields from "./pages/TestFields";
import Departments from "./pages/Departments";
import EmployeeCategories from "./pages/EmployeeCategories";
import Engineers from "./pages/Engineers";
import Brigades from "./pages/Brigades";
import Worker from "./components/Worker";
import Workers from "./pages/Workers";
import TestEquipments from "./pages/TestEquipments";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route exact path="/stages" element={<Stages/>}/>
              <Route exact path="/manufacture" element={<Manufactures/>}/>
              <Route exact path="/testfield" element={<TestFields/>}/>
              <Route exact path="/department" element={<Departments/>}/>
              <Route exact path="/empl-category" element={<EmployeeCategories/>}/>
              <Route exact path="/engineer" element={<Engineers/>}/>
              <Route exact path="/brigade" element={<Brigades/>}/>
              <Route exact path="/worker" element={<Workers/>}/>
              <Route exact path="/test-equipment" element={<TestEquipments/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
