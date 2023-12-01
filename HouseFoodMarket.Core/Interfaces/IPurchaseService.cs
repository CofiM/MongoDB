using HouseFoodMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HouseFoodMarket.Core.Interfaces
{
    public interface IPurchaseService
    {
        Task AddPurchase(string idProduct, string idUser, bool delivery,int amount);

        Task<List<Purchase>> GetUserPurchase(string id);

        Task<List<Purchase>> GetPurchases();
    }
}
