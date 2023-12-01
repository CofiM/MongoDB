using HouseFoodMarket.Core.Interfaces;
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
    public class ReviewController : Controller
    {
        private readonly IReviewService reviewService;
        public ReviewController(IReviewService service)
        {
            this.reviewService = service;
        }

        [HttpGet]
        [Route("GetReviews")]
        public async Task<ActionResult> GetReviews()
        {
            return Ok(await reviewService.GetAllReviews());
        }

        [HttpGet]
        [Route("GetProductReviews/{idProduct}")]
        public async Task<ActionResult> GetProductReviews(string idProduct)
        {
            return Ok(await reviewService.GetProductReviews(idProduct));
        }

        [HttpPost]
        [Route("AddReview/{grade}/{com}/{idProduct}")]
        public async Task<ActionResult> AddReview(int grade, string com, string idProduct)
        {
            await reviewService.AddReview(grade, com, idProduct);
            return Ok("Added successfully");
        }

        [HttpDelete]
        [Route("RemoveView/{id}")]
        public async Task<ActionResult> RemoveView(string id)
        {
            await reviewService.RemoveReview(id);
            return Ok("Removed");
        }
    }
}
