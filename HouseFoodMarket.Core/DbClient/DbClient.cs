using HouseFoodMarket.Core.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HouseFoodMarket.Core.DbClient
{
    public class DbClient : IDbClient
    {
        public MongoClient client;
        public IMongoDatabase database;

        public DbClient()
        {
            client = new MongoClient("mongodb+srv://filipm:microlabm223@naprednebaze.yx3n4fe.mongodb.net/test");
            database = client.GetDatabase("baza");   
        }

        public IMongoCollection<Administrator> GetAdministratorCollection()
        {
            return database.GetCollection<Administrator>("administratorCollection");
        }

        public IMongoCollection<Deliverer> GetDelivererCollection()
        {
            return database.GetCollection<Deliverer>("delivererCollection");
        }

        public IMongoCollection<HouseHold> GetHouseHoldCollection()
        {
            return database.GetCollection<HouseHold>("houseHoldCollection");
        }

        public IMongoCollection<Product> GetProductCollection()
        {
            return database.GetCollection<Product>("productCollection");
        }

        public IMongoCollection<User> GetUserCollection()
        {
            return database.GetCollection<User>("userCollection");
        }

        public IMongoCollection<Review> GetReviewCollection()
        {
            return database.GetCollection<Review>("reviewCollection"); 
        }

        public IMongoCollection<Job> GetJobCollection()
        {
            return database.GetCollection<Job>("jobCollection");
        }
        //za svaku klasu ova funckija return 


        public IMongoCollection<Purchase> GetPurchaseCollection()
        {
            return database.GetCollection<Purchase>("purchaseCollection");
        }

        public IMongoCollection<UserJob> GetUserJobCollection()
        {
            return database.GetCollection<UserJob>("userJobCollection");
        }

    }
}
