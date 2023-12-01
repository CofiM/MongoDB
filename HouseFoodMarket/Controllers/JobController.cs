using HouseFoodMarket.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace HouseFoodMarket.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJobService jobService;

        public JobController(IJobService jobService)
        {
            this.jobService = jobService;
        }


        [Route("AddJobForHouseHold/{idHouseHold}/{numberOfEmployee}/{dateForStart}/{description}/{salary}")]
        [HttpPost]
        public IActionResult AddJobForHouseHold(string idHouseHold, int numberOfEmployee, DateTime dateForStart, string description, int salary)
        {
            try
            {
                return Ok(jobService.AddNewJobAsync(numberOfEmployee, dateForStart, description, salary, idHouseHold));
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
