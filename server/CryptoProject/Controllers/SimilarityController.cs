using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptoProject.DataAccess;
using CryptoProject.Entity;
using CryptoProject.Model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CryptoProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SimilarityController : ControllerBase
    {
        // kripto idsini alacak, o kriptonun anlık değişimini alacak eğer ki %2den fazlaysa öneri kısmıda bu kriptonun % si ve bundan büyük değişimleri gösterecek
        // Karar ağacının çıkardığı trend soonucuna göre => sonuç up çıkarsa diğer upperları getirsin.
        [HttpGet("similarity")]
        public async Task<IActionResult> getSimilarity(string cryptoId)
        {
            var client = new HttpClient();
            var response = await client.GetAsync("https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD");
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();

                // decimal change = Convert.ToDecimal(JObject.Parse(content)["coins"]["priceChange1d"].Value<double>());
                decimal coinChange = (decimal)await getChangeAsync(cryptoId);

                var response2 = await client.GetAsync("https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD");

                if (response2.IsSuccessStatusCode)
                {
                    var responseString = await response2.Content.ReadAsStringAsync();
                    try
                    {
                        var jsonResponse = new { success = true, data = JObject.Parse(responseString) };

                        var otherCryptos = JObject.Parse(responseString)["coins"]
                                            .Select(c => new
                                            {
                                                id = c["id"].Value<string>(),
                                                symbol = c["symbol"].Value<string>(),
                                                name = c["name"].Value<string>(),
                                                price = (decimal)c["price"].Value<double>(),
                                                imageUrl = c["icon"].Value<string>(),
                                                priceChange1d = (decimal)c["priceChange1d"].Value<double>()
                                            })
                                            .Where(c => coinChange < 0 ? c.priceChange1d < coinChange : c.priceChange1d > coinChange)
                                            .OrderByDescending(c => c.priceChange1d)
                                            .ToList();

                        var jsonResult = JsonConvert.SerializeObject(new { OtherCryptos = otherCryptos });


                        return new ContentResult
                        {
                            ContentType = "application/json",
                            StatusCode = 200,
                            Content = jsonResult
                        };
                    }
                    catch (Exception ex)
                    {
                        return BadRequest($"Error: Failed to parse JSON - {ex.Message}");
                    }

                }
            }
            return BadRequest("Error: Could not retrieve crypto information.");
        }


        private async Task<double> getChangeAsync(string cryptoId)
        {
            var client = new HttpClient();
            var response = await client.GetAsync($"https://api.coingecko.com/api/v3/coins/{cryptoId}");
            decimal change = 0;
            if (response == null)
            {
                return 0;
            }

            if (response.IsSuccessStatusCode)
            {

                var content = await response.Content.ReadAsStringAsync();
                try
                {
                    var jsonObject = JObject.Parse(content);
                    change = (decimal)jsonObject["market_data"]["price_change_percentage_24h"].Value<double>();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error parsing JSON content: {ex.Message}");
                    throw;
                }

            }
            return (double)change;
        }

    }
}