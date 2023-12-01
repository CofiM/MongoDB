import * as React from "react";
import { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import jwt from "jwt-decode";

import jwt_decode from "jwt-decode";
import { ExtractData } from "../Helper/extract.js";
import AuthContext from "../Helper/auth-context";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [textEmail, setTextEmail] = useState("");
  const [labelIsShown, setLabelIsShown] = useState(false);

  const [pass, setPass] = React.useState({
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChangePassword = (prop) => (event) => {
    setPass({ ...pass, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPass({
      ...pass,
      showPassword: !pass.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeEmailHandler = (event) => {
    setTextEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    if (
      textEmail === null ||
      pass.password === null
    )
      setLabelIsShown(true);

    fetchLoginClient();
  };

  async function fetchLoginClient() {
    const response = await fetch(
      "https://localhost:44326/Administrator/GetAccount/" +
        textEmail +
        "/" +
        pass.password,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      }
    );
    let token = await response.json();

    localStorage.setItem("Token", token);

    let aa = ExtractData(token, "name");
    console.log(aa);

    let role = ExtractData(token, "role");
    console.log(role);

    let id = ExtractData(token, "serialnumber");
    console.log(id);
  
    if(role == "U")
    {
      navigate("/FrontPage");
    }

    if(role == "H")
    { 
      navigate("/HouseHoldView");
    }
  
    if(role == "A")
    {
      navigate("/AdminPage");
    }
  }

  return (
    <div style={{ background: "#E1E8C9", height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              // marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 8,
            }}
          >
            <Avatar
              sx={{ m: 1, /* bgcolor: "secondary.main" */ bgcolor: "grey" }}
            ></Avatar>
            <Typography component="h1" variant="h5">
              Prijavi se
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={onChangeEmailHandler}
              />
              <FormControl sx={{ width: 400 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={pass.showPassword ? "text" : "password"}
                  value={pass.password}
                  onChange={handleChangePassword("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {pass.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {labelIsShown && (
                <p style={{ color: "red" }}>
                  {" "}
                  Nevalidan unos za e-mail ili sifru{" "}
                </p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
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
                Prijavi se
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/Registration" variant="body2" color="#070E59">
                    Nemate profil? Registrujte se
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
