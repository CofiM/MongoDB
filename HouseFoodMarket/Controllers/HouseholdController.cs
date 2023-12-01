using HouseFoodMarket.Core.Interfaces;
using HouseFoodMarket.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace HouseFoodMarket.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HouseholdController : ControllerBase
    {

        private readonly IHouseHoldService householdService;

        public HouseholdController(IHouseHoldService householdService)
        {
            this.householdService = householdService;
        }

        [Route("GetAllHouseHolds")]
        [HttpGet]
        public async Task<IActionResult> GetAllHouseHolds()
        {
            try
            {
                var houseHolds = await householdService.GetAllHouseHoldsAsync();
                return Ok(houseHolds);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpGet]
        [Route("GetHouseHoldAccount/{username}/{password}")]
        public async Task<IActionResult> GetHouseHoldAccount(string username, string password)
        {
            try
            {
                var user = await householdService.GetHouseHoldAccountAsync(username, password);
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut, Authorize(Roles = "H")]
        [Route("ChangeHouseHoldInformation/{name}/{username}/{password}/{confPassword}/{email}/{number}/{adress}/{houseId}")]

        public async Task<IActionResult> ChangeHouseHoldInformation(string name, string username, string password, string confPassword, string email, string number, string adress, string houseId)
        {
            try
            {
                if (await householdService.ChangeHouseHoldInformationAsync(name, username, password, confPassword, email, number, adress, houseId))
                {
                    return Ok("ok");
                }

                return BadRequest("Something is wrong!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("ChooseDeliverer/{houseHoldId}/{delivererId}")]
        public async Task<IActionResult> ChooseDeliverer(string houseHoldId, string delivererId)
        {
            try
            {
                await householdService.ChooseDelivererAsync(houseHoldId, delivererId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
