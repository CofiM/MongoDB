using HouseFoodMarket.Core.DbClient;
using HouseFoodMarket.Core.Interfaces;
using HouseFoodMarket.Core.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace HouseFoodMarket.Services.Implementations
{
    public class DelivererService : IDelivererService
    {
        public readonly IMongoCollection<Deliverer> delivererCollection;

        public DelivererService(IDbClient client)
        {
            this.delivererCollection = client.GetDelivererCollection();
        }

        public async Task<List<Deliverer>> GetAllDeliverersAsync()
        {
            return await delivererCollection.Find(item => true).ToListAsync();
        }

    }
}
