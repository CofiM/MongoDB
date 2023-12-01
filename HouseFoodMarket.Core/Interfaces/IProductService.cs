using HouseFoodMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HouseFoodMarket.Core.Interfaces
{
    public interface IProductService
    {
        List<Product> GetProducts();

        Task AddProduct(string name, int amount, int price, string description, string category, string idHouseHold);

        Task<object> GetProduct(string productId);

        Task ChangeAmount(string productId, int amount);

        Task EditProductAsync(string productId, string name, int price, string description, string category);

        Task<List<Product>> GetAllProductsFromHouseHold(string id);

        Task<List<Product>> GetAllProductWithNameAsync(string name);

        Task<List<Product>> GetAllProductWithCategoryAsync(string category);

        Task<List<Product>> GetAllProductWithNameAndCategoryAsync(string name, string category);

        Task DeleteProductAsync(string id);


    }
}
