import React, { useState, useEffect } from "react";
import JobsCardForHousehold from "./JobsCardForHousehold";
import DeleteJobsModal from "./DeleteJobsModal";
import AddNewJobsCard from "./AddNewJobsCard";
import { useNavigate } from "react-router-dom";
import AddJobsModal from "./AddJobsModal";
import UpdateJobsModal from "./UpdateJobsModal";
import classes from "./JobsView.module.css";
import { ExtractData } from "../../Helper/extract";

const JobsView = () => {
  const [jobs, setJobs] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddNew, setOpenAddNew] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [job, setJob] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const token = localStorage.getItem("Token");


  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseAdd = () => {
    setOpenAddNew(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const onClickUpdateHandler = (ID) => {
    setJob(jobs.find((el) => el.ID == ID));
    setOpenUpdate(true);
    console.log(job);
  };

  const onClickAddHandelr = () => {
    setOpenAddNew(true);
  };

  const fetchJobsHandler = async () => {
    const ID = ExtractData(token, "serialnumber");
    const response = await fetch(
      "https://localhost:44326/JobContoller/GetJobsByHouseholdId/" + ID,
      {headers: { Authorization: `Bearer ${token}` }}
    );

    const data = await response.json();
    console.log(data);
    const transformedDataJobs = data.map(function(prod) {
      return {
        ID: prod.id,
        availableSpots: prod.availableSpots,
        startingDate: prod.startingDate,
        description: prod.description, 
        salary: prod.salary,
      };
    });
    setJobs(transformedDataJobs);
    setIsLoaded(true);

  };

  const onClickAddNewJobsHandler = async (

    availableSpots,
    startingDate,
    description,
    salary
    ) => {
    const ID = ExtractData(token, "serialnumber");
    const response = await fetch(
      "https://localhost:44326/JobContoller/AddJob/" +
      availableSpots +
        "/" +
        startingDate +
        "/" +
        description +
        "/" +
        salary +
        "/" +
        ID,
      { method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setOpenAddNew(false);
    fetchJobsHandler();

  };

  const onDeleteHandler = async () => {

    const ID = ExtractData(token, "serialnumber");
    const response = await fetch(
      "https://localhost:44326/JobContoller/DeleteJob/" + ID + "/" + job.ID,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setOpenDelete(false);
    fetchJobsHandler();

  };

  const onClickSaveChangeHandler = async (
    availableSpots,
    startingDate,
    description,
    salary
    ) => {
    const ID = ExtractData(token, "serialnumber");
    const response = await fetch(
      "https://localhost:44326/JobContoller/UpdateJob/" +
        ID +
        "/" +
        job.ID +
        "/" +
        availableSpots +
        "/" +
        startingDate +
        "/" +
        description +
        "/" +
        salary,
      { method: "PUT",
        headers: { Authorization: `Bearer ${token}` } 
      }
    );
    setOpenUpdate(false);
    fetchJobsHandler();
    window.location.reload(false);
    
  };

  const onClickDeleteHandler = (ID) => {
    setJob(jobs.find((el) => el.ID == ID));
    setOpenDelete(true);
  };

  useEffect(() => {
    fetchJobsHandler();
  }, []);
  if (!isLoaded) {
    return <div className={classes.Loading}>Loading...</div>;
  }
  return (
    <div>
      <div className={classes.allProducts}>
        {jobs.map((prod) => (
          <JobsCardForHousehold
            key={prod.ID}
            className={classes.Product}
            description={prod.description}
            availableSpots={prod.availableSpots}
            salary={prod.salary}
            startingDate={prod.startingDate}
            onClickUpdate={() => onClickUpdateHandler(prod.ID)}
            onClickDelete={() => onClickDeleteHandler(prod.ID)}
          />
        ))}
        <AddNewJobsCard
          className={classes.Product}
          onClickAdd={onClickAddHandelr}
        />
      </div>
      <div>
        {openDelete && (
          <DeleteJobsModal
            show={openDelete}
            onClose={handleCloseDelete}
            onDelete={onDeleteHandler}
          />
        )}
      </div>
      <div>
        {openAddNew && (
          <AddJobsModal
            show={openAddNew}
            onClose={handleCloseAdd}
            onClickAddNewProduct={onClickAddNewJobsHandler}
          />
        )}
      </div>
      <div>
        {openUpdate && (
          <UpdateJobsModal
            show={openUpdate}
            onClose={handleCloseUpdate}
            description={job.description}
            availableSpots={job.availableSpots}
            salary={job.salary}
            startingDate={job.startingDate}
            onClickSaveChange={onClickSaveChangeHandler}
          />
        )}
      </div>
    </div>
  );
};

export default JobsView;
