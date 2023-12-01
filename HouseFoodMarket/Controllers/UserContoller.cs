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
    public class UserContoller : ControllerBase
    {
        private readonly IUserService userService;

        public UserContoller(IUserService service)
        {
            this.userService = service;
        }

        [HttpPost]
        [Route("AddUser/{username}/{mail}/{password}/{confPassword}/{name}/{surname}")]
        
        public async Task<IActionResult> AddUser(string username, string mail, string password, string confPassword, string name, string surname)
        {
            if (await userService.CreateUserAccountAsync(username, mail, password, confPassword, name, surname))
            {
                return Ok("User create acc!");
            }

            return BadRequest("Something is wrong");
        }

        [HttpGet]
        [Route("GetUserAccount/{username}/{password}")]
        public async Task<IActionResult> GetUserAccount(string username, string password)
        {
            try
            {
                var user = await userService.GetUserAccountAsync(username, password);
                return Ok(user);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet, Authorize(Roles = "U")]
        [Route("GetUserAccountById/{userId}")]
        public async Task<IActionResult> GetUserAccountById(string userId)
        {
            try
            {
                var user = await userService.GetUserAccountByIdAsync(userId);
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut, Authorize(Roles = "U")]
        [Route("UpdateProfile/{username}/{mail}/{password}/{confPassword}/{name}/{surname}/{userId}")]

        public async Task<IActionResult> UpdateProfile(string username, string mail, string password, string confPassword, string name, string surname, string userId)
        {
            try
            {
                if (await userService.ChangeUserInformationAsync(username, mail, password, confPassword, name, surname, userId))
                {
                    return Ok("ok");
                }

                return BadRequest("Something is wrong!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("ApplyForJob/{userId}/{jobId}")]
        public async Task<IActionResult> ApplyForJob(string userId, string jobId)
        {

            await userService.ApplyForJobAsync(userId, jobId);

            return Ok();

        }



    }
}
