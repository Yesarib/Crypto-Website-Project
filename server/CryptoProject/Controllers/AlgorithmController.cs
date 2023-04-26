using Microsoft.AspNetCore.Mvc;
using CryptoProject.DataAccess;
using CryptoProject.Entity;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using CryptoProject.Model;

namespace CryptoProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlgorithmController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> getKNN(string cryptoId){

            var client = new HttpClient();
            var response = await client.GetAsync($"https://api.coingecko.com/api/v3/coins/{cryptoId}/market_chart?vs_currency=usd&days=365&interval=daily");
            if (response == null)
            {
                return BadRequest();
            }
            try
            {
                var responseString = await response.Content.ReadAsStringAsync();
                // var jsonObject = JObject.Parse(responseString);
                var prices = JObject.Parse(responseString)["prices"].ToArray();
                var dataSet = new List<double[]>();

                for (int i = 0; i < prices.Length; i++)
                {
                    var data = new double[] { i, (double)prices[i][1] };
                    dataSet.Add(data);
                }

                var knn = new Knn(3);
                var X = dataSet.Select(item => new double[] { item[0] }).ToList();
                var y = dataSet.Select(item => item[1]).ToList();
                knn.Fit(X, y);

                var prediction = knn.Predict(new[] { new double[] { dataSet.Count } });
                return Ok(prediction);
                }
                catch (System.Exception)
                {
                    
                    throw;
                }
        }
    }
}