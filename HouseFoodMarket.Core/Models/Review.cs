using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace HouseFoodMarket.Core.Models
{
    public class Review
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int Grade { get; set; }
        public string Comment { get; set; }

        //fk
        public Product Product { get; set; }
    }
}
