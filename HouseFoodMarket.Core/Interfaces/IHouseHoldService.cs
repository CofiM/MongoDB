using HouseFoodMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HouseFoodMarket.Core.Interfaces
{
    public interface IHouseHoldService
    {
        Task<List<HouseHold>> GetAllHouseHoldsAsync();

        Task<HouseHold> GetHouseHoldAccountAsync(string username, string password);

        Task ChooseDelivererAsync(string houseHoldId, string delivererId);

        Task<bool> ChangeHouseHoldInformationAsync(string name, string username, string password, string confPassword, string email, string number, string adress, string houseId);

    }
}
