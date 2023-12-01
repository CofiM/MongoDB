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
    public class PurchaseService : IPurchaseService
    {

        private readonly IDbClient dbClient;

        public PurchaseService(IDbClient db)
        {
            this.dbClient = db;
        }
        public async Task AddPurchase( string idProduct, string idUser, bool delivery,int amount)
        {
            //HouseHold house = await houseHoldCollection.Find(p => p.Id == idHouseHold).FirstOrDefaultAsync();
            IMongoCollection<Product> products = dbClient.GetProductCollection();
            Product product = await products.Find(p => p.Id == idProduct).FirstOrDefaultAsync();

            if (product == null)
            {
                throw new Exception("Product does not exist!");
            }

            IMongoCollection<User> users = dbClient.GetUserCollection();
            User user = await users.Find(p => p.Id == idUser).FirstOrDefaultAsync();

            if (user == null)
            {
                throw new Exception("User does not exist!");
            }


            Purchase temp = new Purchase
            {
                Delivery = delivery,
                User = user,
                Product = product,
                Amount = amount,
            };

            IMongoCollection<Purchase> purchases = dbClient.GetPurchaseCollection();
            await purchases.InsertOneAsync(temp);
        }

        public async Task<List<Purchase>> GetPurchases()
        {
            IMongoCollection<Purchase> purchases = dbClient.GetPurchaseCollection();
            return await purchases.Find(book => true).ToListAsync();
        }

        public async Task<List<Purchase>> GetUserPurchase(string id)
        {
            IMongoCollection<Purchase> temp = dbClient.GetPurchaseCollection();
            var res = await temp.Find(p => p.User.Id == id).ToListAsync();
            if (res == null)
            {
                throw new Exception("No purchases for given user");
            }
            return res;
        }
    }
}
