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
        public async Task<IActionResult> getKNN(string cryptoId)
        {

            var client = new HttpClient();
            // var response = await client.GetAsync($"https://api.coingecko.com/api/v3/coins/{cryptoId}/market_chart?vs_currency=usd&days=365&interval=daily");
            var response = await client.GetAsync($"https://api.coinstats.app/public/v1/charts?period=1y&coinId={cryptoId}");

            if (response == null)
            {
                return BadRequest();
            }
            try
            {
                var responseString = await response.Content.ReadAsStringAsync();
                // var jsonObject = JObject.Parse(responseString);
                var prices = JObject.Parse(responseString)["chart"].ToArray();
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

        [HttpGet("Decision-Tree")]
        public async Task<IActionResult> getDecisionTree(string cryptoId)
        {
            var client = new HttpClient();
            var response = await client.GetAsync($"https://api.coinstats.app/public/v1/charts?period=1y&coinId={cryptoId}");

            if (response != null)
            {
                var content = await response.Content.ReadAsStringAsync();
                var data = JObject.Parse(content);
                var prices = data["chart"].Select(p => (double)p[1]).ToArray();

                if (prices != null)
                {
                    var decisionTree = new DecisionTree(prices);
                    var trend = decisionTree.CheckPriceTrend();

                    return Ok(trend);
                }
                else
                {
                    return BadRequest("Prices data is null.");
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}