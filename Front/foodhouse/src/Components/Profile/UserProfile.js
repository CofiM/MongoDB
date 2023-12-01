import { useState, useEffect, useContext } from "react";
import InputText from "../UI/InputText";
import InputPassword from "../UI/InputPassword";
import Button from "@mui/material/Button";
import classes from "./UpdateProfileKorisnik.module.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../Helper/auth-context";
import { ExtractData } from "../Helper/extract.js";


const DesignProfile =  (props) => {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [mail, setmail] = useState("");

  let token = localStorage.getItem("Token");
  let Id = ExtractData(token, "serialnumber");

  useEffect(() => {
    fetchUserInformation();
  }, []);
  async function fetchUserInformation(){
    const userInformation = await fetch("https://localhost:44326/UserContoller/GetUserAccountById/" + Id,
     {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
        },
    }
    );
    const userData = await userInformation.json();
    setIme(userData.name);
    setPrezime(userData.surname);
    setUsername(userData.username);
    setmail(userData.email);
    console.log(userData);
  }


  async function fetchUpdateProfile() {
    let token = localStorage.getItem("Token");
    const response = await fetch(
      "https://localhost:44326/UserContoller/UpdateProfile/ " + username + "/" + mail + "/" + password + "/" + confPassword + "/" + ime + "/" + prezime + "/" + Id,
      {
        method: "PUT",
        body: JSON.stringify({ title: "Uspesno je azuriran" }),
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const onChangeImeHandler = (event) => {
    setIme(event.target.value);
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

  const onChangeconfPasswordHandler = (event) => {
    setconfPassword(event.target.value);
  };

  const onChangemailHandler = (event) => {
    setmail(event.target.value);
  };

  const updateProfileHandler = (event) => {
    event.preventDefault();
    console.log("Ulazim");

    fetchUpdateProfile();
    window.location.reload(false); //REFRESH PAGE
  };

  return (
    <div className={classes.mainDesign}>
      <div className={classes.divInformation}>
        <InputText label="Ime" value={ime} onChange={onChangeImeHandler} />
        <InputText
          label="Prezime"
          onChange={onChangePrezimeHandler}
        />
        <InputText
          label="Username"
          value={username}
          onChange={onChangeUsernameHandler}
        />

        <InputPassword
          label="Password"
          value={password}
          onChange={onChangePasswordHandler}
        />
        <InputPassword
          label="Confirm password"
          value={confPassword}
          onChange={onChangeconfPasswordHandler}
        />
        <InputText
          label="Mail"
          value={mail}
          onChange={onChangemailHandler}
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
