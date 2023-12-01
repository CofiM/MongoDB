import React from "react";
import { useHistory } from "react-router-dom";
import PosloviCard from "./JobCard.js";
import { useState, useEffect } from "react";
import classes from "./Job.module.css";
import WarningModal from "../HouseHold/WarningModal.js";
import { ExtractData } from "../../Helper/extract.js";

const ViewJobsDate = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [openWarning, setOpenWarning] = useState(false);
  const token = localStorage.getItem("Token");
  const date = localStorage.getItem("Date");

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
    async function searchWithData() {
      const response = await fetch(
        "https://localhost:44326/JobContoller/GetJobsByDate/" + date,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      const jobs = data.map((job, index) => {
        return {
          indeks: index,
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
    searchWithData();
  }, []);

  return (
    <div className={classes.search}>
      {/* <div className={classes.searchDiv}>
                    <input type="text" placeholder="Lokacija" onChange={adresaHandler} />
                    <input type="date" value="2022-05-15" min="2022-01-01" max="2022-12-31" />
                    <button onClick={searchWithLocation} >Pretrazi</button>
                </div> */}
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

export default ViewJobsDate;
