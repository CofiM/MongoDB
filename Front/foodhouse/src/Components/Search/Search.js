import * as ReactDOM from "react-dom";
import classes from "./Search.module.css";
import React, { Component } from "react";
import { useState } from "react";
import { withRouter } from "react-router";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Pretraga = () => {
  

  const [category, setCategory] = useState("");
  const [categoryValid, setCategoryValid] = useState(false);

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);

  const handleChangeCategory = (e) => {


    setCategory(e.target.value);
    if (e.target.value != "") {
      setCategoryValid(true);
    } else {
      setCategoryValid(false);
    }

  };

  const handleChangeName = (e) => {

    setName(e.target.value);
    if (e.target.value != "") {
      setNameValid(true);
    } else {
      setNameValid(false);
    }

  };

  const choosePage = () => {

    if (categoryValid != false && nameValid != false) {
      categoryAndNameSend(category, name);
    } else if (categoryValid != false) {
      categorySend(category);
      console.log(category);
    } else if (nameValid != false) {
      nameSend(name);
      console.log(name);
    }

  };

  const navigate = useNavigate();

  const categoryAndNameSend = (category, name) => {
    localStorage.setItem("Category", category);
    localStorage.setItem("Name", name);
    navigate("/ViewProductsCategoryAndName");
  };

  const categorySend = (data) => {
    localStorage.setItem("Category", data);
    navigate("/ViewProductsCategory");
    };

  const nameSend = (data) => {
    localStorage.setItem("Name", data);
    navigate("/ViewProductsName");
  };

  const categoryArray = [
    {
      label: "Mlečni proizvodi",
      value: "Mlečni proizvodi",
    },
    {
      label: "Med i proizvodi od meda",
      value: "Med i proizvodi od meda",
    },
    {
      label: "Rakije",
      value: "Alcohol",
    },
    {
      label: "Meso i mesne prerađevine",
      value: "Meso i mesne prerađevinekije",
    },
    {
      label: "Domaća jaja",
      value: "Domaća jaja",
    },
    {
      label: "Džem i slatko",
      value: "Džem i slatko",
    },
    {
      label: "Voće i povrće",
      value: "Voće i povrće",
    },
  ];

  return (
    <div className={classes.divGlavni}>
      <input
        className={classes.unosPodataka}
        type="text"
        placeholder="Koji proizvod želite da pronađete"
        onChange={handleChangeName}
      ></input>
      <div className="example-config"></div>

      <div>
        <select
          className={classes.unosPodataka}
          onChange={handleChangeCategory}
          placeholder="Kategorija"
        >
          <option value="">Kategorija</option>
          {categoryArray.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="button">
        <Button
          className={classes.buttonPretraga}
          variant="contained"
          color="success"
          onClick={choosePage}
        >
          Pretraga
        </Button>
      </div>
    </div>
  );
};
export default Pretraga;
