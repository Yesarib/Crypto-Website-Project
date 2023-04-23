using CryptoProject.DataAccess;
using CryptoProject.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CryptoProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly Context _context;

        public FavoritesController(Context context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CryptoInfo>>> GetFavorites(int userId)
        {
            var favorites = await _context.Favorites.Where(f => f.UserId == userId).ToListAsync();

            var cryptoInfos = new List<CryptoInfo>();
            var httpClient = new HttpClient();

            foreach (var favorite in favorites)
            {
                var url = $"https://api.coingecko.com/api/v3/coins/{favorite.CryptoId}";
                var response = await httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var cryptoInfo = JsonConvert.DeserializeObject<CryptoInfo>(content);
                    cryptoInfo.CurrentPrice = JsonConvert.DeserializeObject<Dictionary<string, decimal>>(JObject.Parse(content)["market_data"]["current_price"].ToString());
                    cryptoInfo.ImageUrl = JObject.Parse(content)["image"]["small"].ToString();
                    cryptoInfo.PriceChange1d = (decimal)JObject.Parse(content)["market_data"]["price_change_percentage_24h"].Value<double>();
                    cryptoInfo.MarketCap = JObject.Parse(content)["market_data"]["market_cap"]["usd"].ToString();
                    cryptoInfo.CryptoId = JObject.Parse(content)["id"].ToString();
                    cryptoInfos.Add(cryptoInfo);
                }
            }

            return Ok(cryptoInfos);
        }

        [HttpPost]
        public async Task<ActionResult<Favorite>> AddFavorite(Favorite favorite)
        {
            var userId = favorite.UserId; 
            var existingFavorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.UserId == userId && f.CryptoId == favorite.CryptoId);

            if (existingFavorite != null)
            {
                return BadRequest();
            }

            var newFav = new Favorite
            {
                UserId = userId,
                CryptoId = favorite.CryptoId,
            };

            _context.Favorites.Add(newFav);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFavorites), new {id = newFav.Id}, newFav);
        }

        // [HttpDelete]
        // public async Task<ActionResult<Favorite>> DeleteFavorite(string cryptoId)
        // {

        // }

    }
}
