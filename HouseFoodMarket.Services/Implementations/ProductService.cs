using HouseFoodMarket.Core.DbClient;
using HouseFoodMarket.Core.Interfaces;
using HouseFoodMarket.Core.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HouseFoodMarket.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IMongoCollection<Product> productCollection;
        private readonly IMongoCollection<HouseHold> houseHoldCollection;

        public ProductService(IDbClient dbClient)
        {
            this.productCollection = dbClient.GetProductCollection();
            this.houseHoldCollection = dbClient.GetHouseHoldCollection();
        }

        public async Task AddProduct(string name, int amount, int price, string description, string category,string idHouseHold)
        {

            HouseHold house = await houseHoldCollection.Find(p => p.Id == idHouseHold).FirstOrDefaultAsync();

            if (house == null)
            {
                throw new Exception("House hold does not exist!");
            }

            Product temp = new Product
            {
                Name = name,
                Amount = amount,
                Price = price,
                Description = description,
                Category = category,
                HouseHold = house
            };

            await productCollection.InsertOneAsync(temp);
        }

        public async Task ChangeAmount(string productId, int amount)
        {
            Product product = await productCollection.Find(p => p.Id == productId).FirstOrDefaultAsync();
            
            if (product.Amount < amount)
            {
                throw new Exception("Amount is bigger than product.amount!");
            }

            product.Amount -= amount;
            var update = Builders<Product>.Update.Set("Amount", product.Amount);
            await productCollection.UpdateOneAsync(p => p.Id == productId, update);
        }

        public async Task EditProductAsync(string productId, string name, int price, string description, string category)
        {
            Product product = await productCollection.Find(p => p.Id == productId).FirstOrDefaultAsync();

            product.Name = name;
            product.Price = price;
            product.Description = description;
            product.Category = category;

            var update = Builders<Product>.Update.Set("Name", product.Name).Set("Price", product.Price).Set("Description", product.Description).Set("Category", product.Category);
            await productCollection.UpdateOneAsync(p => p.Id == productId, update);
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await productCollection.Find(book => true).ToListAsync();
        }

        public async Task<List<Product>> GetAllProductsFromHouseHold(string id)
        {
            return await productCollection.Find(item => item.HouseHold.Id == id).ToListAsync();
        }

        public async  Task<List<Product>> GetAllProductWithCategoryAsync(string category)
        {
            return await productCollection.Find(item => item.Category == category).ToListAsync();
        }

        public async Task<List<Product>> GetAllProductWithNameAsync(string name)
        {
            return await productCollection.Find(item => item.Name == name).ToListAsync();
        }

        public async Task<List<Product>> GetAllProductWithNameAndCategoryAsync(string name, string category)
        {
            return await productCollection.Find(item => item.Name == name && item.Category==category).ToListAsync();
        }

        public async Task<object> GetProduct(string productId)
        {
            Product product = await productCollection.Find(p => p.Id == productId).FirstOrDefaultAsync();
            return new
            {
                Id = product.Id,
                Name = product.Name,
                Amount = product.Amount,
                Price = product.Price,
                Description = product.Description,
                Category = product.Category,
                HouseId = product.HouseHold.Id,
                HouseName = product.HouseHold.Name
            };
        }

        public List<Product> GetProducts()
        {
            throw new NotImplementedException();
        }

        public async Task DeleteProductAsync(string id)
        {
            await productCollection.DeleteOneAsync(item => item.Id==id);
        }

    }
}
