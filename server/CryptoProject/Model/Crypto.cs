namespace CryptoProject.Entity
{
    public class CryptoInfo
    {
        public string CryptoId { get; set; }
        public string Name{ get; set; }
        public string Symbol{ get; set; }
        public decimal CurrentPrice { get; set; }
        public string ImageUrl { get; set; }
        public decimal PriceChange1d { get; set; }
        public string MarketCap { get; set; }
    }
}
