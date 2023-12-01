using HouseFoodMarket.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HouseFoodMarket.Core.DbClient
{
    public interface IDbClient 
    {
        //za svaku klasu


        IMongoCollection<Product> GetProductCollection();
        IMongoCollection<Administrator> GetAdministratorCollection();
        IMongoCollection<Deliverer> GetDelivererCollection();
        IMongoCollection<User> GetUserCollection();
        IMongoCollection<HouseHold> GetHouseHoldCollection();
        IMongoCollection<Purchase> GetPurchaseCollection();
        IMongoCollection<Review> GetReviewCollection();
        IMongoCollection<Job> GetJobCollection();

        IMongoCollection<UserJob> GetUserJobCollection();
        // za sve modele koje mi imamo 
    }
}
