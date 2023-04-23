using AutoMapper;
using CryptoProject.Dtos;
using CryptoProject.Entity;

namespace CryptoProject.Mapping
{
    public class AutoMapper: Profile
    {
        public AutoMapper()
        {
            CreateMap<CreateRegister,User>().ReverseMap();
            CreateMap<LoginDto,User>().ReverseMap();
            //CreateMap<Favorite, Crypto>().ReverseMap();
        }
    }
}
