using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace HouseFoodMarket.Core.Models
{
    public class UserJob
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

       // [BsonIgnore]
        public User User { get; set; }

       // [BsonIgnore]
        public Job Job { get; set; }
    }
}
