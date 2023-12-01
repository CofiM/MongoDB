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
    public class HouseHoldService : IHouseHoldService
    {
        public readonly IMongoCollection<HouseHold> houseHoldCollection;

        public readonly IMongoCollection<Deliverer> delivererCollection;

        public HouseHoldService(IDbClient service)
        {
            this.houseHoldCollection = service.GetHouseHoldCollection();
            this.delivererCollection = service.GetDelivererCollection();
        }

        public async Task<bool> ChangeHouseHoldInformationAsync(string name, string username, string password, string confPassword, string email, string number, string adress, string houseId)
        {
            var house = await houseHoldCollection.Find(item => item.Id == houseId).FirstOrDefaultAsync();

            if (house != null)
            {
                var updateName = Builders<HouseHold>.Update.Set("Name", name);
                var updateNumber = Builders<HouseHold>.Update.Set("Number", number);
                var updateMail = Builders<HouseHold>.Update.Set("Email", email);
                var updateUsername = Builders<HouseHold>.Update.Set("Username", username);
                var updateAdress = Builders<HouseHold>.Update.Set("Adress", adress);
                if (password == confPassword)
                {
                    CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
                    var updateHash = Builders<HouseHold>.Update.Set("PasswordHash", passwordHash);
                    var updateSalt = Builders<HouseHold>.Update.Set("PasswordSalt", passwordSalt);
                    await houseHoldCollection.UpdateOneAsync(p => p.Id == houseId, updateHash);
                    await houseHoldCollection.UpdateOneAsync(p => p.Id == houseId, updateSalt);
                }
                await houseHoldCollection.UpdateOneAsync(p => p.Id == houseId, updateName);
                await houseHoldCollection.UpdateOneAsync(p => p.Id == houseId, updateNumber);
                await houseHoldCollection.UpdateOneAsync(p => p.Id == houseId, updateMail);
                await houseHoldCollection.UpdateOneAsync(p => p.Id == houseId, updateUsername);
                await houseHoldCollection.UpdateOneAsync(p => p.Id == houseId, updateAdress);

                return true;
            }

            throw new InvalidOperationException("User not exist!");
        }

        public async Task ChooseDelivererAsync(string houseHoldId, string delivererId)
        {
            var houseHold = await houseHoldCollection.Find(item => item.Id == houseHoldId).FirstOrDefaultAsync();

            var deliverer = await delivererCollection.Find(item => item.Id == delivererId).FirstOrDefaultAsync();

            if(houseHold == null || deliverer == null)
            {
                throw new InvalidOperationException("HouseHold or Deliverer not exist!");
            }

            houseHold.Deliverer = deliverer;

            var update = Builders<HouseHold>.Update.Set("Deliverer", houseHold.Deliverer);
            await houseHoldCollection.UpdateOneAsync(p => p.Id == houseHoldId, update);

        }

        public async Task<List<HouseHold>> GetAllHouseHoldsAsync()
        {
            return await this.houseHoldCollection.Find(item => true).ToListAsync();
        }

        public async Task<HouseHold> GetHouseHoldAccountAsync(string username, string password)
        {
            var houseHold = await houseHoldCollection.Find(item => item.Username == username).FirstOrDefaultAsync();

            if (houseHold != null)
            {
                if (!VerifyPasswordHash(password, houseHold.PasswordHash, houseHold.PasswordSalt))
                {
                    throw new InvalidOperationException("Invalid password!");
                }
                return houseHold;
            }

            throw new InvalidOperationException("HouseHold not exist!");
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmc = new HMACSHA512())
            {
                passwordSalt = hmc.Key;
                passwordHash = hmc.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
