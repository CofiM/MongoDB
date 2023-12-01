using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HouseFoodMarket.Core.Models
{
    public class HouseHold
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }

        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
        public string Email { get; set; }

        [RegularExpression("^\\s*\\+?\\s*([0-9][\\s-]*){9,}$")]
        public string Number { get; set; }

        public string Adress { get; set; }

        public char Role { get; set; }
        // VEZE --------------------------

        //[JsonIgnore]
        public List<Job> Jobs { get; set; }

        //[JsonIgnore]
        public List<Product> Products { get; set; }

        //[JsonIgnore]
        public Deliverer Deliverer { get; set; }

        //[JsonIgnore]
        //public virtual Administrator Administrator { get; set; }


    }
}
