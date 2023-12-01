using HouseFoodMarket.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HouseFoodMarket.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DelivererController : ControllerBase
    {
        private readonly IDelivererService service;
        public DelivererController(IDelivererService service)
        {
            this.service = service;
        }


        [HttpGet]
        [Route("GetAllDeliverer")]
        public async Task<IActionResult> GetAllDeliverer()
        {
            try
            {
                var deliverer = await service.GetAllDeliverersAsync();
                return Ok(deliverer);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
