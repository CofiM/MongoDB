using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using HouseFoodMarket.Core.DbClient;
using HouseFoodMarket.Core.Interfaces;
using HouseFoodMarket.Core.Models;
using MongoDB.Driver;
using Microsoft.AspNetCore.Authorization;

namespace HouseFoodMarket.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdministratorController : ControllerBase
    {
        private readonly IAdministratorService service;

        public readonly IMongoCollection<Administrator> mongoCollection;
        public AdministratorController(IDbClient dbClient, IAdministratorService administratorService)
        {
            this.mongoCollection = dbClient.GetAdministratorCollection();
            this.service = administratorService;
        }

        [HttpPost, Authorize(Roles = "A")]
        [Route("AddDeliverer/{name}/{surname}/{username}/{price}/{phoneNumber}")]

        public async Task<IActionResult> AddDeliverer(string name, string surname, string username, int price, string phoneNumber)
        {
            if (await service.AddDelivererAsync(name, surname, username, price, phoneNumber))
            {
                return Ok("Successfully add deliverer!");
            }

            return BadRequest("Something is wrong!");
        }

        [Route("AddHouseHold/{name}/{username}/{password}/{email}/{number}/{adress}")]
        [HttpPost, Authorize(Roles = "A")]

        public async Task<IActionResult> AddHouseHold(string name, string username, string password, string email, string number, string adress)
        {
            if (await service.AddHouseHoldAsync(name, username, password, email, number, adress))
            {
                return Ok("Successfully add house hold!");
            }

            return BadRequest("Something is wrong!");
        }

        [HttpGet]
        [Route("GetAccount/{username}/{password}")]
        [Produces("application/json")]
        public async Task<string> GetAccount(string username, string password)
        {
            try
            {
                return await service.GetAccountAsync(username, password);
            }
            catch(Exception e)
            {
                return e.Message;
            }
        }

        [HttpDelete, Authorize(Roles = "A")]
        [Route("DeleteDeliverer/{delivererId}")]

        public async Task<IActionResult> DeleteDeliverer(string delivererId)
        {
            if (await service.DeleteDelivererAsync(delivererId))
            {
                return Ok("Deliverer delete");
            }

            return BadRequest("Something wrong!");
        }
    }
}
