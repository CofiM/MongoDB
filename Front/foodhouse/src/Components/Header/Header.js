import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../Pictures/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import classes from "./Header.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { HeaderItems } from "./HeaderComponentsUser.js";
import { HeaderItemsDomacinstvo } from "./HeaderComponentsHouseHold.js";
import { useCart } from "react-use-cart";
import { textFieldClasses } from "@mui/material";
import AuthContext from "../Helper/auth-context.js";
import { ExtractData } from "../Helper/extract.js";
import CartBox from "../ShoppingCart/CartBox.js";


const settings = ["Profile", "Logout"];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const [korisnikIsLoggedIn, setKorisnikIsLoggedIn] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [openWarning, setOpenWarning] = useState(false);
  const [crt, setCrt] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onClickHandler = (type) => {
    let path = type;
    navigate(path);
    setAnchorElNav(null);
  };

  const onClickCart = (type) => {
    let token = localStorage.getItem("Token");
    let korisnik = ExtractData(token, "role");
    if (korisnik != null) {
      let path = type;
      navigate(path);
    } else {
      setOpenWarning(true);
    }
  };
  
  const onClickProfile = (type) => {
    if (type === "Profile") {
      let tok = localStorage.getItem("Token");
      console.log(tok);
      let flag;
      if (tok == null) {
        flag = null;
      } else {
        flag = ExtractData(tok, "role");
      }
      if (flag === null) {
        let path = "LogIn";
        navigate(path);
      } else if (flag === "H") {
        let path = "ProfilDomacinstvo";
        navigate(path);
      } else if (flag === "U") {
        let path = "ProfilKorisnik";
        navigate(path);
      } 
    }
    if (type === "Logout") {
      const token = localStorage.getItem("Token");
      localStorage.removeItem("Token");
      let tip = ExtractData(token, "role");

      //OVO ISPOD TREBA DA RESIMOOOOO, MISLIM DA CE ISTO DA SE BRISU NARUDZBINE

      /* if (tip === "K") {
        let idKorisnika = ExtractData(token, "serialnumber");
        // const idKorisnika = JSON.parse(localStorage.getItem("KorisnikID"));
        fetch(
          "https://localhost:5001/Narudzbine/ObrisiNarudzbine/" + idKorisnika,
          {
            method: "DELETE",
            body: JSON.stringify({ title: "Uspesno dodatno" }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then(emptyCart());
      } */

      let path = "/FrontPage";
      navigate(path);
      window.location.reload(false); //REFRESH PAGE
    }
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  const items = () => {
    const token = localStorage.getItem("Token");
    let flag = null;
    if (token != null) {
      flag = ExtractData(token, "role");
    }
    if (flag === "" || flag === null) {
      return HeaderItems;
    }
    if (flag === "U") {
      return HeaderItems;

    } else if (flag === "H") {
      return HeaderItemsDomacinstvo;
    }
    else if (flag == "A")
    {
      return [];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    let role = null;
    if (token != null) {
      role = ExtractData(token, "role");
    }

    if(role == "U")
    {
      setCrt(true);
      setKorisnikIsLoggedIn(true);
    }


  },[])

  return (
    <AppBar position="static" sx={{ background: "#4E944F" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              //color: "inherit",
              color: "#4E944F",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Logo" width="200" height="80" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {<Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {items().map((page) => (
                <MenuItem
                  key={page.route}
                  onClick={() => onClickHandler(page.route)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu> }
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Logo" width="200" height="80" />
          </Typography>
          {<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {items().map((page) => (
              <React.Fragment key={page.label}>
                <Button
                  key={page.id}
                  onClick={() => onClickHandler(page.route)}
                  className={classes.button}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              </React.Fragment>
            ))}
          </Box> }

          {korisnikIsLoggedIn && crt && (
            <Box sx={{ color: "black", marginRight: "1%" }}>
              <Button
                sx={{ color: "white" }}
                onClick={() => onClickCart("Cart")}
              >
                <CartBox />
              </Button>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Otvori profil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    onClickProfile(setting);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    //</div>
  );
};

export default ResponsiveAppBar;
