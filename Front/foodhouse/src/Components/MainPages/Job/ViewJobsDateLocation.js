import React from "react";
import { useHistory } from "react-router-dom";
import PosloviCard from "./JobCard";
import { useState, useEffect } from "react";
import classes from "./Job.module.css";
import WarningModal from "../HouseHold/WarningModal.js";
import { ExtractData } from "../../Helper/extract.js";

const ViewJobsDateLocation = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [openWarning, setOpenWarning] = useState(false);
  const token = localStorage.getItem("Token");
  const adress = localStorage.getItem("Adress");
  const date = localStorage.getItem("Date");
  // localStorage.removeItem("Adress");
  // localStorage.removeItem("Date");

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };


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

 
  useEffect(() => {
    async function searchWithDataAndLocation() {
      const response = await fetch(
        "https://localhost:44326/JobContoller/GetJobsByDateAndAddress/" + date + "/" + adress,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      console.log(data);
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
      console.log(jobs);
    }
    searchWithDataAndLocation();
  }, []);

  return (
    <div className={classes.search}>
      <div>
        {allJobs.map((job) => (
          <PosloviCard
            key={job.id}
            description={job.description}
            availableSpots={job.availableSpots}
            startingDate={job.startingDate.split("T")[0]}
            salary={job.salary}
            houseHold={job.houseHold}
            adress={job.adress}
            onClicksignIn={() =>
            onClicksignInHandler(job.id, job.idDomacinstva)
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

export default ViewJobsDateLocation;
