import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { useState } from "react";

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

export default function BasicModal(props) {
  const [open, setOpen] = useState(props.show);
  const [value, setValue] = useState(0);
  console.log(props);
  const [brRadnihMesta, setBrRadnihMesta] = useState(props.availableSpots);
  const [datum, setDatum] = useState(props.startingDate);
  const [cena, setCena] = useState(props.salary);
  const [opis, setOpis] = useState(props.description);

  const brojRadnihMestaChange = (e) => {
    setBrRadnihMesta(e.target.value);
  };

  const datumChange = (e) => {
    setDatum(e.target.value);
  };

  const cenaChange = (e) => {
    setCena(e.target.value);
  };

  const opisChange = (e) => {
    setOpis(e.target.value);
  };

  const sendArgument = () => {
    props.onClickSaveChange(brRadnihMesta, datum, opis, cena);
  };

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
            sx={{ m: 1 }}
            onChange={opisChange}
            id="demo-helper-text-misaligned"
            value={opis}
            label="Naziv"
          />
          <TextField
            sx={{ m: 1 }}
            onChange={brojRadnihMestaChange}
            id="demo-helper-text-misaligned"
            value={brRadnihMesta}
            label="Broj slobodnih radnih mesta"
          />
          <TextField
            sx={{ m: 1 }}
            onChange={cenaChange}
            id="demo-helper-text-misaligned"
            value={cena}
            label="Cena"
          />
          <TextField
            id="datum"
            label="Datum pocetka posla"
            type="date"
            defaultValue={Date.now}
            sx={{ m: 1, width: 222 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={datumChange}
          />
          <div>
            <Button onClick={props.onClose}>Otkazi</Button>
            <Button onClick={sendArgument}>Izmeni posao</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
