using HouseFoodMarket.Core.Interfaces;
using HouseFoodMarket.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HouseFoodMarket.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobContoller : ControllerBase
    {
        private readonly IJobService jobService;

        public JobContoller(IJobService service)
        {
            this.jobService = service;
        }

        [HttpPost, Authorize(Roles = "H")]
        [Route("AddJob/{availableSpots}/{startingDate}/{description}/{salary}/{houseHoldId}")]
        public async Task<IActionResult> AddJob(int availableSpots, DateTime startingDate, string description, int salary, string houseHoldId)
        {
            try
            {
                await jobService.AddNewJobAsync(availableSpots, startingDate, description, salary, houseHoldId);
                return Ok("ok");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetJob/{jobId}")]
        public async Task<IActionResult> GetJob(string jobId)
        {
            return Ok(await jobService.GetJob(jobId));
        }

        [HttpPut]
        [Route("ChangeAvailableSpots/{jobId}/{availableSpots}")]
        public async Task<IActionResult> ChangeAvailableSpots(string jobId, int availableSpots)
        {
            try
            {
                await jobService.ChangeAvailableSpots(jobId, availableSpots);
                return Ok("ok");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetJobs")]
        public async Task<IActionResult> GetJobs()
        {
            return Ok(await jobService.GetJobs());
        }

        [HttpGet]
        [Route("GetJobsByAdress/{adress}")]
        public async Task<IActionResult> GetJobsByAdress(string adress)
        {
            return Ok(await jobService.GetJobsByAdress(adress));
        }

        [HttpGet]
        [Route("GetJobsByDate/{date}")]
        public async Task<IActionResult> GetJobsByDate(DateTime date)
        {
            return Ok(await jobService.GetJobsByDate(date));
        }

        [HttpGet]
        [Route("GetJobsByDateAndAddress/{date}/{address}")]
        public async Task<IActionResult> GetJobsByDateAndAddress(DateTime date, string address)
        {
            return Ok(await jobService.GetJobsByDateAndAddress(date, address));
        }

        [HttpGet]
        [Route("GetJobsByHouseholdId/{householdId}")]
        public async Task<IActionResult> GetJobsByHouseholdId(string householdId)
        {
            return Ok(await jobService.GetJobsByHouseholdId(householdId));
        }


        [HttpPut, Authorize(Roles = "H,U")]
        [Route("UpdateJob/{householdId}/{id}/{availableSpots}/{startingDate}/{description}/{salary}")]
        public async Task<IActionResult> UpdateJob(string householdId, string id,  int availableSpots, DateTime startingDate, string description, int salary)
        {
            try
            {
                await jobService.UpdateJob(householdId, id, availableSpots, startingDate, description, salary);
                return Ok("ok");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpDelete, Authorize(Roles = "H,U")]
        [Route("DeleteJob/{householdId}/{id}")]
        public async Task<IActionResult> DeleteJob(string householdId, string id)
        {
            try
            {
                await jobService.DeleteJob(householdId, id);
                return Ok("Uspesno");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
