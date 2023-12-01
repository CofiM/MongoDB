using HouseFoodMarket.Core.DbClient;
using HouseFoodMarket.Core.Interfaces;
using HouseFoodMarket.Core.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HouseFoodMarket.Services.Implementations
{
    public class ReviewService : IReviewService
    {
        private readonly IDbClient dbClient;
        public ReviewService(IDbClient db)
        {
            dbClient = db;
        }

        public async Task AddReview(int grade, string comment,string idProduct)
        {
            IMongoCollection<Product> products = dbClient.GetProductCollection();
            var res = await products.Find(p=>p.Id == idProduct).FirstOrDefaultAsync();
            Product temp = new Product
            {
                Id = res.Id,
                Name = res.Name,
                Amount = res.Amount,
                Price = res.Price,
                Description = res.Description,
                Category = res.Category,
            };
            IMongoCollection<Review> reviewCollection = dbClient.GetReviewCollection();
            Review rev = new Review
            {
                Grade = grade,
                Comment = comment,
                Product = temp
            };
            await reviewCollection.InsertOneAsync(rev);
        }

        public async Task<List<Review>> GetAllReviews()
        {
            IMongoCollection<Review> reviewCollection = dbClient.GetReviewCollection();
            return reviewCollection.Find(book => true).ToList();
        }

        public async Task<List<Review>> GetProductReviews(string idProduct)
        {
            IMongoCollection<Review> reviews = dbClient.GetReviewCollection();
            var res = reviews.Find(p => p.Product.Id == idProduct).ToList();
            return res;
        }

        public async Task RemoveReview(string id)
        {
            IMongoCollection<Review> reviews = dbClient.GetReviewCollection();
            await reviews.DeleteOneAsync(p => p.Id == id);
        }
    }
}
