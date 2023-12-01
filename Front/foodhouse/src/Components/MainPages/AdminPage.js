import { useState, useEffect, useContext } from "react";
import InputText from "../UI/InputText";
import InputPassword from "../UI/InputPassword";
import Button from "@mui/material/Button";
import classes from "../Profile/UpdateProfileKorisnik.module.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../Helper/auth-context";
import { ExtractData } from "../Helper/extract.js";


const DesignProfile =  (props) => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [username, setUsername] = useState("");
  const [cena, setCena] = useState("");
  const [brojTelefona, setBrojTelefona] = useState("");
  const [imeHouse, setImeHouse] = useState("");
  const [usernameHouse, setUsernameHouse] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [brojTelefonaHouse, setBrojTelefonaHouse] = useState("");
  const [adresa, setAdresa] = useState("");

  async function fetchAddDeliverer() {
    let token = localStorage.getItem("Token");
    const response = await fetch(
      "https://localhost:44326/Administrator/AddDeliverer/ " + ime + "/" + prezime + "/" + username + "/" + cena + "/" + brojTelefona,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      }
    );

  }

  async function fethcAddHouseHold() {
    let token = localStorage.getItem("Token");
    const response = await fetch(
      "https://localhost:44326/Administrator/AddHouseHold/ " + imeHouse + "/" + usernameHouse + "/" + password + "/" + email + "/" + brojTelefonaHouse + "/" + adresa,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      }
    );
  }

  const onChangeImeHandler = (event) => {
    setIme(event.target.value);
  };

  const onChangeImeHouseHandler = (event) => {
    setImeHouse(event.target.value);
  };

  const onChangePrezimeHandler = (event) => {
    setPrezime(event.target.value);
  };

  const onChangeUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onChangeEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onChangeUsernameHouseHandler = (event) => {
    setUsernameHouse(event.target.value);
  };

  const onChangeCenaHandler = (event) => {
    setCena(event.target.value);
  };


  const onChangBrojTelefonaHandler = (event) => {
    setBrojTelefona(event.target.value);
  };

  const onChangBrojTelefonaHouseHandler = (event) => {
    setBrojTelefonaHouse(event.target.value);
  };

  const onChangAdresaHandler = (event) => {
    setAdresa(event.target.value);
  };

  const createDelivererHandler = (event) => {
    event.preventDefault();
    console.log("Ulazim");

    fetchAddDeliverer();
    window.location.reload(false); //REFRESH PAGE
  };

  const createHouseHoldHandler = (event) => {
    event.preventDefault();
    console.log("Ulazim");

    fethcAddHouseHold();
    window.location.reload(false); //REFRESH PAGE
  };


  return (
    <div className={classes.mainDesign}>
      <div className={classes.divInformation}>
        <InputText label="Ime" onChange={onChangeImeHandler} />
        <InputText
          label="Prezime"
          onChange={onChangePrezimeHandler}
        />
        <InputText
          label="Username"
          onChange={onChangeUsernameHandler}
        />

        <InputText
          label="Cena"
          onChange={onChangeCenaHandler}
        />
        <InputText
          label="Broj telefona"
          onChange={onChangBrojTelefonaHandler}
        />
      </div>
      <div className={classes.buttonDiv}>
        <button className={classes.buttonDesign} onClick={createDelivererHandler}>
          Dodaj dostavljaca
        </button>
      </div>
      <div className={classes.divInformation}>
        <InputText label="Ime" onChange={onChangeImeHouseHandler} />
        <InputText
          label="Username"
          onChange={onChangeUsernameHouseHandler}
        />
        <InputText
          label="Password"
          onChange={onChangePasswordHandler}
        />

        <InputText
          label="Email"
          onChange={onChangeEmailHandler}
        />
        <InputText
          label="Broj telefona"
          onChange={onChangBrojTelefonaHouseHandler}
        />
        <InputText
          label="Adresa"
          onChange={onChangAdresaHandler}
        />
      </div>
      <div className={classes.buttonDiv}>
        <button className={classes.buttonDesign} onClick={createHouseHoldHandler}>
          Dodaj domacinstvo
        </button>
      </div>
    </div>
  );
};

export default DesignProfile;
