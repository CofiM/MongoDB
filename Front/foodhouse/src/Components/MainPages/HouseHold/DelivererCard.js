import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function DelivererCard(props) {
  return (
    <Card sx={{ minWidth: 275, width: 320, m: 2 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 24, fontWeight: 800, textDecoration: "underline" }}
          color="text"
          gutterBottom
        >
          {props.ime + " " + props.prezime}
        </Typography>
        <Typography
          sx={{ fontSize: 18, fontWeight: 400 }}
          color="text"
          gutterBottom
        >
          E-mail: {props.email}
        </Typography>
        <Typography
          sx={{ fontSize: 18, fontWeight: 400 }}
          color="text"
          gutterBottom
        >
          Usluga: {props.cena}
        </Typography>
        <Typography
          sx={{ fontSize: 18, fontWeight: 400 }}
          color="text"
          gutterBottom
        >
          Telefon: {props.telefon}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignItems: "center", justifyContent: "center" }}>
        <Button
          variant="contained"
          disableElevation
          onClick={props.onClick}
          sx={{
            mt: 3,
            mb: 2,
            background: "#BCCF7D",
            "&:hover": {
              background: "#4E944F",
              /* background: "#4B5E22" */
            },
          }}
        >
          {" "}
          Izaberi
        </Button>
      </CardActions>
    </Card>
  );
}
