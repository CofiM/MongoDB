using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using HouseFoodMarket.Core.Models;

namespace HouseFoodMarket.Core.Interfaces
{
    public interface IJobService
    {
        Task AddNewJobAsync(int availableSpots, DateTime startingDate, string description, int salary, string houseHoldId);
        Task<object> GetJob(string jobId);

        Task<List<Job>> GetJobs();

        Task<List<Job>> GetJobsByAdress(string adress);

        Task<List<Job>> GetJobsByHouseholdId(string householdId);

        Task<List<Job>> GetJobsByDate(DateTime date);

        Task UpdateJob(string householdId, string id, int availableSpots, DateTime startingDate, string description, int salary);

        Task DeleteJob(string householdId, string id);

        Task<List<Job>> GetJobsByDateAndAddress(DateTime date, string address);

        Task ChangeAvailableSpots(string jobId, int availableSpots);
    }
}
