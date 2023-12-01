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
    public class ProductController : Controller
    {
        private readonly IProductService productService;
        public ProductController(IProductService service) 
        {
            this.productService = service;
        }

        [HttpGet]
        [Route("GetProduct/{productId}")]
        public async Task<IActionResult> GetProduct(string productId)
        {
            return Ok(await productService.GetProduct(productId));
        }

        [HttpGet, Authorize(Roles = "U,H")]
        [Route("GetAllProductsFromHouseHold/{id}")]
        public async Task<IActionResult> GetAllProductsFromHouseHold(string id)
        {
            try
            {
                var products = await productService.GetAllProductsFromHouseHold(id);
                return Ok(products);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost, Authorize(Roles = "H")]
        [Route("AddProduct/{name}/{amount}/{price}/{description}/{category}/{idHouseHold}")]
        public async Task<IActionResult> AddProduct(string name, int amount, int price, string description, string category, string idHouseHold)
        {
            try
            {
                await productService.AddProduct(name, amount, price, description, category, idHouseHold);
                return Ok("ok");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("ChangeAmount/{productId}/{amount}")]
        public async Task<IActionResult> ChangeAmount(string productId, int amount)
        {
            try
            {
                await productService.ChangeAmount(productId, amount);
                return Ok("ok");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut, Authorize(Roles = "H")]
        [Route("EditProduct/{productId}/{name}/{price}/{description}/{category}")]
        public async Task<IActionResult> EditProduct(string productId, string name, int price, string description, string category)
        {
            try
            {
                await productService.EditProductAsync(productId, name, price, description, category);
                return Ok("OK");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetAllProductsWithName/{name}")]
        public async Task<IActionResult> GetAllProductsWithName(string name)
        {
            try
            {
                var products = await productService.GetAllProductWithNameAsync(name);
                return Ok(products);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetAllProductsWithCategory/{category}")]
        public async Task<IActionResult> GetAllProductsWithCategory(string category)
        {
            try
            {
                var products = await productService.GetAllProductWithCategoryAsync(category);
                return Ok(products);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetAllProductsWithNameAndCategory/{name}/{category}")]
        public async Task<IActionResult> GetAllProductsWithNameAndCategory(string name, string category)
        {
            try
            {
                var products = await productService.GetAllProductWithNameAndCategoryAsync(name, category);
                return Ok(products);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete, Authorize(Roles = "H")]
        [Route("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            try
            {
                await productService.DeleteProductAsync(id);
                return Ok("Uspesno");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
