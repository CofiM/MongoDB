import React, { useEffect, useState } from "react";
import HouseHoldCard from "./HouseHoldCard.js";
import classes from "./HouseHolds.module.css";
import { useNavigate } from "react-router-dom";

function HouseHolds() {
  const navigate = useNavigate();
  
  const openHouseHold = (Adresa, ID, Naziv) => {
    localStorage.setItem("HouseHoldID", ID);
    localStorage.setItem("HouseHoldAddress", Adresa);
    localStorage.setItem("HouseHoldName", Naziv);
    console.log("ID " + ID + "    ADRESA " + Adresa);
    let path = "/HouseHold";
    navigate(path);
  };

  const token = localStorage.getItem("Token");
  const [houseHold, setHouseHold] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    
    const fetchHouseHoldHandler = async () => {
      const response = await fetch(
        "https://localhost:44326/Household/GetAllHouseHolds",
        {Authorization: `Bearer ${token}`}
      );
      const data = await response.json();
      console.log(data);
      const transformedData = data.map((item) => {
        return {
          ID: item.id,
          Name: item.name,
          Username: item.username,
          Email: item.email,
          Telephone: item.number,
          Address: item.adress,
          Role: item.role,
          Jobs: item.poslovi,
          Products: item.proizvodi,
        };
      });
      setHouseHold(transformedData);
      setIsLoaded(true);
    };
    fetchHouseHoldHandler();
  }, []);

  console.log(houseHold);
  if (!isLoaded) {
    return <div className={classes.Loading}>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.allDomacinstva}>
        {houseHold.map((dom) => (
          <HouseHoldCard
            key={dom.ID}
            id={dom.ID}
            Name={dom.Name}
            Address={dom.Address}
            Telephone={dom.Telephone}
            onClick={() => openHouseHold(dom.Address, dom.ID, dom.Name)}
          />
        ))}
      </div>
    </div>
  );
}

export default HouseHolds;
