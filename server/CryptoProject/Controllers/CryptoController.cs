using CryptoProject.DataAccess;
using CryptoProject.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text.Json.Nodes;

namespace CryptoProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CryptoController : ControllerBase
    {
        private readonly Context _context;

        public CryptoController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCrypto()
        {
            var client = new HttpClient();
            var response = await client.GetAsync("https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD");
            if (response == null)
            {
                return BadRequest();
            }
            var responseString = await response.Content.ReadAsStringAsync();
            try
            {
                var jsonResponse = new { success = true, data = JObject.Parse(responseString) };

                var jsonResult = JsonConvert.SerializeObject(jsonResponse);


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

        [HttpGet("AllCrypto/{currentPage}")]
        public async Task<IActionResult> GetAllCrypto(int currentPage)
        {
            var client = new HttpClient();
            var response = await client.GetAsync($"https://api.coinstats.app/public/v1/coins?skip={currentPage}&limit=100&currency=USD");
            if (response == null)
            {
                return BadRequest();
            }
            var responseString = await response.Content.ReadAsStringAsync();
            try
            {
                var jsonResponse = new { success = true, data = JObject.Parse(responseString) };

                var jsonResult = JsonConvert.SerializeObject(jsonResponse);

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

        [HttpGet("SingleCoin/{id}")]
        public async Task<IActionResult> SingleCoin(string id)
        {
            var client = new HttpClient();
            var response = await client.GetAsync($"https://api.coingecko.com/api/v3/coins/{id}");
            if (response == null)
            {
                return BadRequest();
            }
            var responseString = await response.Content.ReadAsStringAsync();
            try
            {
                var jsonResponse = new { success = true, data = JObject.Parse(responseString) };

                var jsonResult = JsonConvert.SerializeObject(jsonResponse);

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
        [HttpGet("HistoricalChart/{id}")]
        public async Task<IActionResult> HistoricalChart(string id, int days=365)
        {
            var client = new HttpClient();
            var response = await client.GetAsync($"https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=usd&days={days}");
            if (response == null)
            {
                return BadRequest();
            }
            var responseString = await response.Content.ReadAsStringAsync();
            try
            {
                var jsonResponse = new { success = true, data = JObject.Parse(responseString) };

                var jsonResult = JsonConvert.SerializeObject(jsonResponse);

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

        [HttpGet("Trend")]
        public async Task<IActionResult> getTrend(){
            var client = new HttpClient();
            var response = await client.GetAsync("https://api.coingecko.com/api/v3/search/trending");
            if (response == null)
            {
                return BadRequest();
            }
            var responseString = await response.Content.ReadAsStringAsync();
            try
            {
                var jsonResponse = new { success = true, data = JObject.Parse(responseString) };

                var jsonResult = JsonConvert.SerializeObject(jsonResponse);


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
    
}
