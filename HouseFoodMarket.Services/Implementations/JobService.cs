using HouseFoodMarket.Core.DbClient;
using HouseFoodMarket.Core.Interfaces;
using HouseFoodMarket.Core.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace HouseFoodMarket.Services.Implementations
{
    public class JobService : IJobService
    {
        private readonly IMongoCollection<Job> jobCollection;
        private readonly IMongoCollection<HouseHold> houseHoldCollection;

        public JobService(IDbClient dbClient)
        {
            this.jobCollection = dbClient.GetJobCollection();
            this.houseHoldCollection = dbClient.GetHouseHoldCollection();
        }

        public async Task AddNewJobAsync(int availableSpots, DateTime startingDate, string description, int salary, string houseHoldId)
        {
            HouseHold house = await houseHoldCollection.Find(p => p.Id == houseHoldId).FirstOrDefaultAsync();

            if (house == null)
            {
                throw new Exception("House hold does not exist!");
            }

            Job job = new Job
            {
                AvailableSpots = availableSpots,
                StartingDate = startingDate,
                Description = description,
                Salary = salary,
                HouseHold = house
            };

            await jobCollection.InsertOneAsync(job);
        }

        public async Task ChangeAvailableSpots(string jobId, int availableSpots)
        {
            Job job = await jobCollection.Find(p => p.Id == jobId).FirstOrDefaultAsync();

            if (job.AvailableSpots < availableSpots)
            {
                throw new Exception("AvailableSpots is bigger than job.AvailableSpots!");
            }

            job.AvailableSpots -= availableSpots;
            var update = Builders<Job>.Update.Set("AvailableSpots", job.AvailableSpots);
            await jobCollection.UpdateOneAsync(p => p.Id == jobId, update);
        }

        public async Task<object> GetJob(string jobId)
        {
            Job job = await jobCollection.Find(p => p.Id == jobId).FirstOrDefaultAsync();
            return new
            {
                Id = job.Id,
                AvailableSpots = job.AvailableSpots,
                StartingDate = job.StartingDate,
                Description = job.Description,
                Salary = job.Salary,
                HouseId = job.HouseHold.Id,
                HouseName = job.HouseHold.Name
            };
        }

        public async Task<List<Job>> GetJobs()
        {
            return await jobCollection.Find(p => true).ToListAsync();

        }
        public async Task<List<Job>> GetJobsByAdress(string adress)
        {
            return await jobCollection.Find(p => p.HouseHold.Adress == adress).ToListAsync();

        }

        public async Task<List<Job>> GetJobsByDate(DateTime date)
        {
            return await jobCollection.Find(p => p.StartingDate <= date).ToListAsync();

        }

        public async Task<List<Job>> GetJobsByDateAndAddress(DateTime date, string address)
        {
            return await jobCollection.Find(p => p.StartingDate <= date && p.HouseHold.Adress == address).ToListAsync();
        }


        public async Task<List<Job>> GetJobsByHouseholdId(string householdId)
        {
            return await jobCollection.Find(p => p.HouseHold.Id == householdId).ToListAsync();
        }

        public async Task DeleteJob(string householdId, string id)
        {
            await jobCollection.DeleteOneAsync(p => p.HouseHold.Id == householdId && p.Id == id);
        }

        public async Task UpdateJob(string householdId, string id, int availableSpots, DateTime startingDate, string description, int salary)
        {

            Job job = await jobCollection.Find(p => p.Id == id && p.HouseHold.Id == householdId).FirstOrDefaultAsync();

            job.AvailableSpots = availableSpots;
            job.Salary = salary;
            job.StartingDate = startingDate;
            job.Description = description;

            var update = Builders<Job>.Update.Set("AvailableSpots", job.AvailableSpots).Set("StartingDate",job.StartingDate).Set("Description", job.Description).Set("Salary",job.Salary);
            await jobCollection.UpdateOneAsync(p => p.Id == id, update);
        }

    }
}
