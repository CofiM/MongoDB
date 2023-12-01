import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import classes from "./AddModal.module.css";
import axios from "axios";
import { ExtractData } from "../../Helper/extract";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function BasicModal(props) {
  const [open, setOpen] = useState(props.show);
  const [value, setValue] = useState(0);
  const [naziv, setNaziv] = useState("");
  const [cena, setCena] = useState("");
  const [opis, setOpis] = useState("");
  const [kategorija, setKategorija] = useState("");
  const [category, setCategory] = useState("Kategorija");
  
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
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
      value: "Rakije",
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

  const nazivChange = (e) => {
    setNaziv(e.target.value);
    console.log(naziv);
  };

  const cenaChange = (e) => {
    setCena(e.target.value);
    console.log(cena);
  };

  const opisChange = (e) => {
    setOpis(e.target.value);
    console.log(opis);
  };

  const kategorijaChange = (e) => {
    setKategorija(e.target.value);
    console.log(e.target.value);
  };


  async function sendArgument() {
    const ID = localStorage.getItem("HouseHoldId");
    var token = localStorage.getItem("Token");
    const response = await fetch(
      "https://localhost:44326/Product/AddProduct/" +
        naziv +
        "/" +
        10 +
        "/" +
        cena +
        "/" +
        opis +
        "/" +
        kategorija +
        "/" +
        ID,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    );
    window.location.reload(false);
  }

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            sx={{ m: 2 }}
            onChange={nazivChange}
            id="demo-helper-text-misaligned"
            value={naziv}
            label="Naziv"
          />
          <TextField
            sx={{ m: 2 }}
            onChange={cenaChange}
            id="demo-helper-text-misaligned"
            value={cena}
            label="Cena"
          />
          <TextField
            sx={{ m: 2 }}
            onChange={opisChange}
            id="demo-helper-text-misaligned"
            value={opis}
            label="Opis"
          />
          <select
            className={classes.category}
            onChange={kategorijaChange}
            placeholder="Kategorija"
          >
            <option value="">Kategorija</option>
            {categoryArray.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>          
          <div>
            <Button onClick={props.onClose}>Otkazi</Button>
            <Button onClick={sendArgument}>Dodaj</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
