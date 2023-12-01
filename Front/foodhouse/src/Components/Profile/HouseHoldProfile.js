import { useState, useEffect } from "react";
import InputText from "../UI/InputText";
import Button from "@mui/material/Button";
import classes from "./UpdateProfileDomacinstvo.module.css";
import InputPassword from "../UI/InputPassword";
import { ExtractData } from "../Helper/extract.js";

const DesignProfile = (props) => {
  const [naziv, setNaziv] = useState(props.Naziv);
  const [username, setUsername] = useState(props.Username);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [adresa, setAdresa] = useState(props.Adresa);
  const [email, setEmail] = useState(props.Adresa);
  const [telefon, setTelefon] = useState(props.Telefon);

  async function fetchUpdateProfile() {
    let token = localStorage.getItem("Token");
    let Id = ExtractData(token, "serialnumber");
    const response = await fetch(
      "https://localhost:44326/Household/ChangeHouseHoldInformation/" + naziv + "/" + username + "/" + 
      password + "/" + confPassword + "/" + email + "/" + telefon + "/" + adresa + "/" + Id,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
  const changeNazivHandler = (event) => {
    setNaziv(event.target.value);
    
  };

  const changeUsernameHandler = (event) => {
    setUsername(event.target.value);
    
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
    
  };

  const changeNewPasswordHandler = (event) => {
    setConfPassword(event.target.value);
    
  };

  const changeAdresaHandler = (event) => {
    setAdresa(event.target.value);
    
  };

  const changeEmailHandler = (event) => {
    setAdresa(event.target.value);
    
  };

  const changeTelefonHandler = (event) => {
    setTelefon(event.target.value);
    
  };


  const updateProfileHandler = (event) => {
    event.preventDefault();
    
    console.log(naziv, username, password, confPassword, adresa, telefon);
    fetchUpdateProfile();
    window.location.reload(false); //REFRESH PAGE
  };

  return (
    <div className={classes.mainDesign}>
      <div className={classes.divInformation}>
        <InputText label="Naziv" value={naziv} onChange={changeNazivHandler} />
        <InputText
          label="Username"
          value={username}
          onChange={changeUsernameHandler}
        />
        <InputPassword
          label="Password"
          value={password}
          onChange={changePasswordHandler}
        />
        <InputPassword
          label="Confirm password"
          value={confPassword}
          onChange={changeNewPasswordHandler}
        />
        <InputText
          label="Email"
          value={adresa}
          onChange={changeEmailHandler}
        />
        <InputText
          label="Broj telefona"
          value={telefon}
          onChange={changeTelefonHandler}
        />
        <InputText
          label="Adresa"
          value={adresa}
          onChange={changeAdresaHandler}
        />
      </div>
      <div className={classes.buttonDiv}>
        <button className={classes.buttonDesign} onClick={updateProfileHandler}>
          Izmeni
        </button>
      </div>
    </div>
  );
};

export default DesignProfile;
