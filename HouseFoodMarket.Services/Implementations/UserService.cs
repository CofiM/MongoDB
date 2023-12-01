using HouseFoodMarket.Core.DbClient;
using HouseFoodMarket.Core.Interfaces;
using HouseFoodMarket.Core.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace HouseFoodMarket.Services.Implementations
{
    public class UserService : IUserService
    {
        public readonly IMongoCollection<User> userCollection;

        public readonly IMongoCollection<Job> jobCollection;

        public readonly IMongoCollection<UserJob> userJobCollection;

        private readonly IConfiguration _configuration;

        public UserService(IDbClient dbClient, IConfiguration _configuration)
        {
            this.userCollection = dbClient.GetUserCollection();
            this.jobCollection = dbClient.GetJobCollection();
            this.userJobCollection = dbClient.GetUserJobCollection();
            this._configuration = _configuration;
        }

        public async Task<bool> CreateUserAccountAsync(string username, string mail, string password, string confPassword, string name, string surname)
        {
            var user = await userCollection.Find(p => p.Email == mail && p.Username == username).FirstOrDefaultAsync();

            if (user != null)
            {
                throw new InvalidOperationException("User already exist!");
            }

            if (password == confPassword)
            {
                CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
                User u = new User();
                u.PasswordHash = passwordHash;
                u.PasswordSalt = passwordSalt;
                u.Username = username;
                u.Email = mail;
                u.Name = name;
                u.Surname = surname;
                u.Role = 'U';

                await userCollection.InsertOneAsync(u);

                return true;
            }

            return false;
        }

        public async Task<User> GetUserAccountAsync(string username, string password)
        {
            var user = await userCollection.Find(item => item.Username == username).FirstOrDefaultAsync();

            if (user != null)
            {
                if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                {
                    throw new InvalidOperationException("Invalid password!");
                }
                return user;
            }

            throw new InvalidOperationException("User not exist!");
        }

        public async Task<bool> ChangeUserInformationAsync(string username, string mail, string password, string confPassword, string name, string surname, string userId)
        {
            var user = await userCollection.Find(item => item.Id == userId).FirstOrDefaultAsync();

            if (user != null)
            {
                var updateName = Builders<User>.Update.Set("Name", name);
                var updateSurname = Builders<User>.Update.Set("Surname", surname);
                var updateMail = Builders<User>.Update.Set("Email", mail);
                var updateUsername = Builders<User>.Update.Set("Username", username);
                if (password == confPassword)
                {
                    CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
                    var updateHash = Builders<User>.Update.Set("PasswordHash", passwordHash);
                    var updateSalt = Builders<User>.Update.Set("PasswordSalt", passwordSalt);
                    await userCollection.UpdateOneAsync(p => p.Id == userId, updateHash);
                    await userCollection.UpdateOneAsync(p => p.Id == userId, updateSalt);
                }
                await userCollection.UpdateOneAsync(p => p.Id == userId, updateName);
                await userCollection.UpdateOneAsync(p => p.Id == userId, updateSurname);
                await userCollection.UpdateOneAsync(p => p.Id == userId, updateMail);
                await userCollection.UpdateOneAsync(p => p.Id == userId, updateUsername);

                return true;
            }

            throw new InvalidOperationException("User not exist!");
        }

        public async Task<User> GetUserAccountByIdAsync(string userId)
        {
            var user = await userCollection.Find(item => item.Id == userId).FirstOrDefaultAsync();

        

            if (user != null)
            {
                return user;
            }

            throw new InvalidOperationException("User not exist!");
        }


        public async Task ApplyForJobAsync(string userId, string jobId)
        {

            var user = await userCollection.Find(item => item.Id == userId).FirstOrDefaultAsync();
            if (user == null)
            {
                throw new InvalidOperationException("User doesn't exist");
            }

            var job = await jobCollection.Find(item => item.Id == jobId).FirstOrDefaultAsync();
            if (job == null)
            {
                throw new InvalidOperationException("Job doesn't exist");
            }

            UserJob tmp = new UserJob
            {
                Job = job,
                User = user
            };

            await userJobCollection.InsertOneAsync(tmp);


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
