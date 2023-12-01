using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace HouseFoodMarket.Core.Models
{
    public class Purchase
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }


        public int Amount { get; set; }

        //fk
        public User User { get; set; }

        public Product Product { get; set; }

        public bool Delivery { get; set; } 
    }
}
