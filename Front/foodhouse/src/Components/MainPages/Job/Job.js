import React, { useState, useEffect } from "react";
import classes from "../../Search/Search.module.css";
import classes2 from "../../Search/Search.module.css";
import JobCard from "./JobCard.js";
import { useNavigate  } from "react-router-dom";
import WarningModal from "../HouseHold/WarningModal.js";
import { ExtractData } from "../../Helper/extract.js";

const Job = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [adresa, setAdresa] = useState("");
  const [validAdresa, setValidAdresa] = useState(false);
  const [datum, setDatum] = useState("");
  const [validDatum, setValidDatum] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const token = localStorage.getItem("Token");

  const [locations, setLocations] = useState();

  const onClicksignInHandler = async (jobId) => {
    const token = localStorage.getItem("Token");
    const userId = ExtractData(token, "serialnumber");

    const response = await fetch(
      " https://localhost:44326/UserContoller/ApplyForJob/" +
      userId +
        "/" +
        jobId,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      }
    );
};

  const navigate = useNavigate();

  const sendLocation = (data) => {
    localStorage.setItem("Adress", data);
    navigate("/ViewJobsLocation");
  };

  const sendDate = (data) => {
    localStorage.setItem("Date", data);
    navigate("/ViewJobsDate");
  };

  const sendDateAndLocation = (adress, date) => {

    localStorage.setItem("Date", date);
    localStorage.setItem("Adress", adress);
    navigate("/ViewJobsDateLocation");

  };

  const adresaHandler = (event) => {

    setAdresa(event.target.value.split(","));
    if (event.target.value != "") {
      setValidAdresa(true);
    } else {
      setValidAdresa(false);
    }

  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  const datumHandler = (event) => {

    setDatum(event.target.value);
    if (event.target.value != "") {
      setValidDatum(true);
    } else {
      setValidDatum(false);
    }

  };

  const choosePage = () => {

    if (validAdresa != false && validDatum != "") {
      sendDateAndLocation(adresa, datum);
      console.log(validDatum);
      console.log(validAdresa);
    } else if (validAdresa != false) {
      sendLocation(adresa);
      console.log(adresa);
    } else if (validDatum != false) {
      sendDate(datum);
      console.log(datum);
    }
    
  };

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch(
        "https://localhost:44326/JobContoller/GetJobs",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`
          },
        }
      );

      const data = await response.json();

      console.log(data);
      console.log("test", data);
      const jobs = data.map((job) => {
        return {
          id: job.id,
          description: job.description,
          availableSpots: job.availableSpots,
          startingDate: job.startingDate,
          salary: job.salary,
          houseHold: job.houseHold.name,
          adress: job.houseHold ? job.houseHold.adress : "nepoznataLokacija",
          houseHoldId: job.houseHold ? job.houseHold.id : -1,
        };
      });

      setAllJobs(jobs);
      setIsLoaded(true);
      console.log(jobs);
    }
    fetchJobs();
  }, []);

  if (!isLoaded) {
    return <div className={classes.Loading}>Loading...</div>;
  }
  return (
    <div className={classes.search}>
      <div className={classes.divForma}>
        <div className={classes.searchDiv}>
          <input
            type="text"
            placeholder="Lokacija"
            onChange={adresaHandler}
            className={classes2.unosPodataka}
          />
          <input
            type="date"
            min="2023-01-01"
            max="2023-12-31"
            defaultValue={""}
            onChange={datumHandler}
            className={classes2.unosPodataka}
          />
          <button className={classes2.Search} onClick={choosePage}>
            Pretrazi
          </button>
        </div>
      </div>
      <div className={classes.divWorks}>
        {allJobs.map((job) => (
          <JobCard
            key={job.id}
            description={job.description}
            availableSpots={job.availableSpots}
            startingDate={job.startingDate.split("T")[0]}
            salary={job.salary}
            houseHold={job.houseHold}
            adress={job.adress}
            onClicksignIn={() =>
              onClicksignInHandler(job.id)
            }
          />
        ))}
      </div>
      <div>
        {openWarning && (
          <WarningModal show={openWarning} onClose={handleCloseWarning} />
        )}
      </div>
    </div>
  );
};

export default Job;
