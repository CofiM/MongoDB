using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace HouseFoodMarket.Core.Models
{
    public class Product
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }

        //// veze ------------------------------
     
    
        public HouseHold HouseHold { get; set; }


        public List<Review> Reviews { get; set; }

        //[BsonIgnore]
        //public virtual Kupovina Kupovina { get; set; }

    }
}
