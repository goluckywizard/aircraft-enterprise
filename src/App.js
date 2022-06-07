import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import './App.css';
import Stages from "./pages/Stages";
import Manufactures from "./pages/Manufactures";
import TestFields from "./pages/TestFields";
import Departments from "./pages/Departments";
import EmployeeCategories from "./pages/EmployeeCategories";

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
          </Routes>
      </Router>
    </div>
  );
}

export default App;
