using Microsoft.AspNetCore.Identity;

namespace CryptoProject.Entity
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }  
        public string Password { get; set; }


    }
}
