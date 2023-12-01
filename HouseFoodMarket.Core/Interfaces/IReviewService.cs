using HouseFoodMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HouseFoodMarket.Core.Interfaces
{
    public interface IReviewService
    {
        Task AddReview(int grade, string comment,string idProduct);

        Task<List<Review>> GetAllReviews();

        Task<List<Review>> GetProductReviews(string idProduct);

        Task RemoveReview(string id);
    }
}
