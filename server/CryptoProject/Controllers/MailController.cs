using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptoProject.DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace CryptoProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MailController : ControllerBase
    {
        private readonly Context _context;

        public MailController(Context context)
        {
            _context = context;
        }

    }
}