import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicCard(props) {
  const onDoubleClickHandler = () => {
    console.log("DOUBLE CLICK");
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        background: "#B4E197",
        width: "100%",
        marginTop: "5%",
        m: 2,
        color: "white"
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <Typography
          sx={{ fontSize: 24, fontWeight: 800, textDecoration: "underline" }}
          color="text"
          gutterBottom
        >
          {props.description}
        </Typography>
        <Typography
          sx={{ fontSize: 18, fontWeight: 400 }}
          color="text"
          gutterBottom
        >
          Broj slobodnih radnih mesta: {props.availableSpots}
        </Typography>
        <Typography
          sx={{ fontSize: 18, fontWeight: 400 }}
          color="text"
          gutterBottom
        >
          Datum početka posla: {props.startingDate}
        </Typography>
        <Typography
          sx={{ fontSize: 18, fontWeight: 400 }}
          color="text"
          gutterBottom
        >
          Zarada: {props.salary} RSD
        </Typography>
        <Typography
          sx={{ fontSize: 18, fontWeight: 400 }}
          color="text"
          gutterBottom
        >
          Domaćin: {props.houseHold}
        </Typography>
        <Typography
          sx={{ fontSize: 18, fontWeight: 400 }}
          color="text"
          gutterBottom
        >
          Adresa: {props.adress}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignItems: "center", justifyContent: "center" }}>
        <Button size="medium" onClick={props.onClicksignIn} sx={{color:"white"}}>
          {" "}
          Prijavi se
        </Button>
      </CardActions>
    </Card>
  );
}
