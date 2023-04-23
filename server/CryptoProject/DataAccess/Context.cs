using CryptoProject.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CryptoProject.DataAccess
{
    public class Context: DbContext
    {
        public Context(DbContextOptions<Context> options):base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=DESKTOP-9AJVO7B;initial catalog=CryptowebDb; integrated security=true; TrustServerCertificate=true");
        }
        public DbSet<User> Users{ get; set; }
        //public DbSet<Crypto> Cryptos{ get; set; }
        public DbSet<Favorite> Favorites{ get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Favorite>()
        //        .HasKey(f => f.Id);

        //    modelBuilder.Entity<Favorite>()
        //        .HasOne(f => f.UserId)
        //        .WithMany(u => u.Favorites)
        //        .HasForeignKey(f => f.User.Id)
        //        .OnDelete(DeleteBehavior.Cascade);

        //    modelBuilder.Entity<Favorite>()
        //        .HasOne(f => f.CryptoId)
        //        .WithMany(c => c.Favorites)
        //        .HasForeignKey(f => f.Crypto.CryptoId)
        //        .OnDelete(DeleteBehavior.Cascade);

        //}

    }
}
