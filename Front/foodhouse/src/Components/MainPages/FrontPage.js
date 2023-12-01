import React from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import Search from "../Search/Search.js";
import classes from "../Search/Search.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { alertClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
const center = { lat: 43.320904, lng: 21.89576 };
let allCordinates = [];
let allLocations = [];
let allName = [];
let allId = [];

const FrontPage = () => { 
  return (
    <div className={classes.container}>
      <div className={classes.pretragaDiv}>
        <div>
          <h1 className={classes.divH1}>Pronađite svog omiljenog domaćina</h1>
        </div>
        <div>
          {" "}
          <Search></Search>
        </div>
       
      </div>
    </div>
  );
};

export default FrontPage;
