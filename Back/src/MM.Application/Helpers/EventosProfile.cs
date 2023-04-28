using AutoMapper;
using MM.Application.Dtos;
using MM.Domain;

namespace MM.Application.Helpers
{
    public class EventosProfile : Profile
    {
        public EventosProfile()
        {
            CreateMap<Evento, EventoDto>().ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteAddDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteUpdateDto>().ReverseMap();

            //CreateMap<User, UserDto>().ReverseMap();
           // CreateMap<User, UserLoginDto>().ReverseMap();
            //CreateMap<User, UserUpdateDto>().ReverseMap();          
        }
    }
}