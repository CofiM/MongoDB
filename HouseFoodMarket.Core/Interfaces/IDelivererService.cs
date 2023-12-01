using HouseFoodMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HouseFoodMarket.Core.Interfaces
{
    public interface IDelivererService
    {
        Task<List<Deliverer>> GetAllDeliverersAsync();

    }
}
