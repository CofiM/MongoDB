import React, { useState, useContext } from "react";
import { Switch, Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HouseHold from "./Components/MainPages/HouseHold/HouseHold.js";
import Header from "./Components/Header/Header.js";
import FrontPage from "./Components/MainPages/FrontPage.js";
import LogIn from "./Components/Login/Login.js";
import Registration from "./Components/Login/Registracija.js";
import AboutUs from "./Components/MainPages/AboutUs/AboutUs.js";
import HouseHolds from "./Components/MainPages/HouseHold/HouseHolds.js";
import Jobs from "./Components/MainPages/Job/Job.js";
import ViewJobsDate from "./Components/MainPages/Job/ViewJobsDate.js";
import ViewJobsLocation from "./Components/MainPages/Job/ViewJobsLocation.js"
import ViewJobsDateLocation from "./Components/MainPages/Job/ViewJobsDateLocation.js"
import ViewProductsName from "./Components/Product/ViewProductName.js";
import ViewProductsCategory from "./Components/Product/ViewProductCategory.js"
import ViewProductsCategoryAndName from "./Components/Product/ViewProductNameAndCategory.js";
import HouseHoldView from "./Components/MainPages/HouseHold/HouseHoldView.js";

import ProfileUser from "./Components/Profile/UserProfile.js"
import ProfileHouseHold from "./Components/Profile/HouseHoldProfile.js"
import AdminPage from "./Components/MainPages/AdminPage.js"
import ViewJobsHH from "./Components/MainPages/HouseHold/JobsView.js";
import './App.css';

function App() {
  return (

      <Router>
        <div className="App">
        <div className="App-header">
          <Header  />
        </div>
        <div className="App-main">
          <main className="Main">
                <Routes>
                  <Route exact path="/" element={<FrontPage/>} />
                  <Route exact path="/Job" element={<Jobs/>} />
                  <Route exact path="/Jobs" element={<ViewJobsHH/>} />
                  <Route exact path="/ViewJobsDateLocation" element={<ViewJobsDateLocation/>} />
                  <Route exact path="/ViewJobsLocation" element={<ViewJobsLocation/>} />
                  <Route exact path="/ViewJobsDate" element={<ViewJobsDate/>} />
                  <Route exact path="/LogIn" element={<LogIn/>} />
                  <Route exact path="/Registration" element={<Registration/>} />
                  <Route exact path="/FrontPage" element={<FrontPage/>} />
                  <Route exact path="/HouseHolds" element={<HouseHolds/>} /> 
                  <Route exact path="/AboutUs" element={<AboutUs/>} />    
                  <Route exact path="/HouseHold" element={<HouseHold/>} /> 
                  <Route exact path="/ViewProductsName" element={<ViewProductsName/>} />   
                  <Route exact path="/ViewProductsCategory" element={<ViewProductsCategory/>} />    
                  <Route exact path="/ViewProductsCategoryAndName" element={<ViewProductsCategoryAndName/>} />  
                  <Route exact path="/HouseHoldView" element={<HouseHoldView/>} />      
                  <Route exact path="/ProfilKorisnik" element={<ProfileUser/>} />          
                  <Route exact path="/ProfilDomacinstvo" element={<ProfileHouseHold/>} />   
                  <Route exact path="/AdminPage" element={<AdminPage/>} />   
                </Routes>
          </main>
        </div>
      </div>
      </Router>  
  );
}

export default App;
