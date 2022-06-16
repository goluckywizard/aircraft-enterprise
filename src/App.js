import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import './App.css';
import {useHistory} from "react-router-dom"
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
import EmployeeAttributes from "./pages/EmployeeAttributes";
import ProductCategories from "./pages/ProductCategories";
import ProductTypes from "./pages/ProductTypes";
import ProductAttributes from "./pages/ProductAttributes";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Products from "./pages/Products";
import Works from "./pages/Works";
import history from './components/history'
import ProductToWorkPage from "./pages/ProductToWorkPage";
import ResetPassword from "./pages/ResetPassword";

function App() {

  return (
    <div className="App">
      <Router history={history}>
          <Routes>
              <Route exact path="/" element={<Manufactures/>}/>
              <Route exact path="/stages" element={<Stages/>}/>
              <Route exact path="/manufacture" element={<Manufactures/>}/>
              <Route exact path="/testfield" element={<TestFields/>}/>
              <Route exact path="/department" element={<Departments/>}/>
              <Route exact path="/empl-category" element={<EmployeeCategories/>}/>
              <Route exact path="/empl-attribute" element={<EmployeeAttributes/>}/>
              <Route exact path="/engineer" element={<Engineers/>}/>
              <Route exact path="/brigade" element={<Brigades/>}/>
              <Route exact path="/worker" element={<Workers/>}/>
              <Route exact path="/test-equipment" element={<TestEquipments/>}/>
              <Route exact path="/product-category" element={<ProductCategories/>}/>
              <Route exact path="/product-attribute" element={<ProductAttributes/>}/>
              <Route exact path="/product-type" element={<ProductTypes/>}/>
              <Route exact path="/registration" element={<RegisterPage/>}/>
              <Route exact path="/login" element={<LoginPage/>}/>
              <Route exact path="/product" element={<Products/>}/>
              <Route exact path="/work" element={<Works/>}/>
              <Route exact path="/product-to-work" element={<ProductToWorkPage/>}/>
              <Route exact path="/change-password" element={<ResetPassword/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
