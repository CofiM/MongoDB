using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using HouseFoodMarket.Core.Models;

namespace HouseFoodMarket.Core.Interfaces
{
    public interface IUserService
    {
        Task<bool> CreateUserAccountAsync(string username, string mail, string password, string confPassword, string name, string surname);

        Task<User> GetUserAccountAsync(string username, string password);
        Task<User> GetUserAccountByIdAsync(string userId);

        Task<bool> ChangeUserInformationAsync(string username, string mail, string password, string confPassword, string name, string surname, string userId);

        Task ApplyForJobAsync(string userId, string jobId);

    }
}
