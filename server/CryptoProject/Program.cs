using CryptoProject.DataAccess;
using CryptoProject.Dtos;
using CryptoProject.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddDbContext<Context>();

//builder.Services.AddIdentity<User, UserRole>()
//    .AddEntityFrameworkStores<Context>()
//    .AddSignInManager<SignInManager<User>>();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CryptoCors", opts =>
    {
        opts.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});





//builder.Services.AddSwaggerGen(c =>
//{
//    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
//    c.SwaggerDoc("v1", new OpenApiInfo { Title = "CryptoProject", Version = "v1" });
//    // di�er Swagger yap�land�rma ayarlar�
//});

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors("CryptoCors");

app.MapControllers();

app.Run();
