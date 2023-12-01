using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace HouseFoodMarket.Core.Models
{
    public class Job
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int AvailableSpots { get; set; }
        public DateTime StartingDate { get; set; }
        public string Description { get; set; }
        public int Salary { get; set; }

        // veze ------------------------------

        public HouseHold HouseHold { get; set; }

       // [BsonIgnore]
        public List<UserJob> UserJob { get; set; }

        //[BsonIgnore]
        //public virtual HouseHold HouseHold { get; set; }
    }
}
