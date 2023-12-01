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

    public class AdministratorService : IAdministratorService
    {
        public readonly IMongoCollection<Deliverer> delivererCollection;

        public readonly IMongoCollection<HouseHold> houseHoldCollection;

        public readonly IMongoCollection<Administrator> administratorCollection;

        public readonly IMongoCollection<User> userCollection;

        private readonly IConfiguration _configuration;

        public AdministratorService(IDbClient dbClient, IConfiguration _configuration)
        {
            this.delivererCollection = dbClient.GetDelivererCollection();
            this.houseHoldCollection = dbClient.GetHouseHoldCollection();
            this.administratorCollection = dbClient.GetAdministratorCollection();
            this.userCollection = dbClient.GetUserCollection();
            this._configuration = _configuration;
        }

        public async Task<bool> AddDelivererAsync(string name, string surname, string username, int price, string phoneNumber)
        {
            Deliverer deliverer = new Deliverer();

            deliverer.Name = name;
            deliverer.Surname = surname;
            deliverer.Username = username;
            deliverer.Price = price;
            deliverer.PhoneNumber = phoneNumber;
            deliverer.Role = 'D';

            await delivererCollection.InsertOneAsync(deliverer);

            return true;
        }

        public async Task<bool> AddHouseHoldAsync(string name, string username, string password, string email, string number, string adress)
        {
            HouseHold houseHold = new HouseHold();

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            houseHold.Name = name;
            houseHold.Username = username;
            houseHold.Email = email;
            houseHold.Number = number;
            houseHold.Adress = adress;
            houseHold.PasswordHash = passwordHash;
            houseHold.PasswordSalt = passwordSalt;
            houseHold.Role = 'H';

            await houseHoldCollection.InsertOneAsync(houseHold);

            return true;

        }

        public async Task<string> GetAccountAsync(string username, string password)
        {
            var admin = await administratorCollection.Find(p => p.Username == username).FirstOrDefaultAsync();

            if (admin != null)
            {
                if (!VerifyPasswordHash(password, admin.PasswordHash, admin.PasswordSalt))
                {
                    throw new InvalidOperationException("Inncorect password");
                }

                return CreateToken(admin.Username, admin.Id, 'A');
            }
            else
            {
                var user = await userCollection.Find(p => p.Username == username).FirstOrDefaultAsync();

                if (user != null)
                {
                    if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                    {
                        throw new InvalidOperationException("Inncorect password");
                    }

                    return CreateToken(user.Username, user.Id, user.Role);
                }
                else
                {
                    var houseHold = await houseHoldCollection.Find(p => p.Username == username).FirstOrDefaultAsync();
                    if (houseHold != null)
                    {
                        if (!VerifyPasswordHash(password, houseHold.PasswordHash, houseHold.PasswordSalt))
                        {
                            throw new InvalidOperationException("Inncorect password");
                        }

                        return CreateToken(houseHold.Username, houseHold.Id, houseHold.Role);
                    }
                    else
                    {
                        throw new InvalidOperationException("User does not exist.");
                    }
                }
            }
        }

        public async Task<bool> DeleteDelivererAsync(string delivererId)
        {
            Deliverer deliverer = await delivererCollection.Find(p => p.Id == delivererId).FirstOrDefaultAsync();

            if (deliverer == null)
            {
                return false;
            }

            await delivererCollection.DeleteOneAsync(p => p.Id == delivererId);

            return true;

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmc = new HMACSHA512())
            {
                passwordSalt = hmc.Key;
                passwordHash = hmc.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(string Username, string Id, char Role)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, Username),
                new Claim(ClaimTypes.Role, Role.ToString()),
                new Claim(ClaimTypes.SerialNumber, Id.ToString())
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
