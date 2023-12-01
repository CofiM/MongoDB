using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HouseFoodMarket.Core.Interfaces
{
    public interface IAdministratorService
    {
        Task<bool> AddDelivererAsync(string name, string surname, string username, int price, string phoneNumber);
        Task<bool> DeleteDelivererAsync(string delivererId);
        Task<bool> AddHouseHoldAsync(string name, string username, string password, string email, string number, string adress);
        Task<string> GetAccountAsync(string username, string password);
    }
}
