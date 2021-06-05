using System;
using System.Collections.Generic;

namespace ghost_bi_backend
{
    public class Helpers
    {
        private static Random Rand = new Random();
        private static readonly List<string> Prefixes = new List<string>()
        {
            "ABC",
            "XYZ",
            "MainSt",
            "Sales",
            "Enterprise",
            "Ready",
            "Quick",
            "Budget",
            "Peak",
            "Magic",
            "Family",
            "Comfort"
        };
        private static readonly List<string> Suffixes = new List<string>()
        {
            "Corporation",
            "Co",
            "Logistics",
            "Transit",
            "Bakery",
            "Goods",
            "Foods",
            "Cleaners",
            "Hotels",
            "Planners",
            "Automative",
            "Books"
        };

        private static readonly List<string> States = new List<string>()
        {
            "AK", "AL", "AZ", "AR", "CO", "CT", "DE", "FL", "GA"
        };

        private static string GetRandom(IList<string> items)
        {
            return items[Rand.Next(items.Count)];
        }

        internal static decimal GetRandomOrderTotal()
        {
            return Rand.Next(100, 5000);
        }
        
        internal static DateTime GetRandomOrderPlaced()
        {
            var end = DateTime.Now;
            var start = end.AddDays(-90);

            TimeSpan possibleSpan = end - start;
            TimeSpan newSpan = new TimeSpan(0, Rand.Next(0, (int)possibleSpan.TotalMinutes), 0);

            return start + newSpan;
        }

        internal static DateTime? GetRandomOrderCompleted(DateTime orderPlaced)
        {
            var now = DateTime.Now;
            var minLeadTime = TimeSpan.FromDays(7);
            var timePassed = now - orderPlaced;

            if(timePassed < minLeadTime)
                return null;

            return orderPlaced.AddDays(Rand.Next(7, 14));
        }

        internal static string MakeUniqueCustomerName(List<string> names)
        {
            var maxNames = Prefixes.Count + Suffixes.Count;

            if(names.Count >= maxNames)
            {
                throw new InvalidOperationException("Maximum number of unique names exceeded");
            }

            string prefix = GetRandom(Prefixes);
            string suffix = GetRandom(Suffixes);
            string name = prefix + suffix;

            if(names.Contains(name))
                MakeUniqueCustomerName(names);

            return name;
        }

        internal static string MakeCustomerEmail(string customerName)
        {
            return $"contact@{customerName.ToLower()}.com";
        }

        internal static string GetRandomState()
        {
            return GetRandom(States);
        }
    }
}