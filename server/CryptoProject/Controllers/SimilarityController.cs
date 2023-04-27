using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptoProject.DataAccess;
using CryptoProject.Entity;
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
    }
}