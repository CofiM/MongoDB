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
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseService purchaseService;
        public PurchaseController(IPurchaseService service)
        {
            this.purchaseService = service;
        }

        [HttpPost]
        [Route("AddPurchase/{idProduct}/{idUser}/{delivery}/{amount}")]
        public async Task<ActionResult> AddPurchase(string idProduct, string idUser, bool delivery,int amount)
        {
            await purchaseService.AddPurchase(idProduct, idUser, delivery, amount );
            return Ok("Added");
        }

        [HttpGet]
        [Route("GetUserPurchase/{idUser}")]
        public async Task<ActionResult> GetUserPurchase(string idUser)
        {
            return Ok(await purchaseService.GetUserPurchase(idUser));
        }

        [HttpGet]
        [Route("GetPurchases")]
        public async Task<ActionResult> GetPurchases()
        {
            return Ok(await purchaseService.GetPurchases());
        }

    }
}
