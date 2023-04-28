using MM.Application.Dtos;
using MM.Domain;

namespace MM.Application.Contratos
{
    public interface IEventoService
    { 
        Task<EventoDto> AddEventos(int userId, EventoDto model);
        Task<EventoDto> UpdateEvento(int userId, int eventoId, EventoDto model);
        Task<bool> DeleteEvento(int userId, int eventoId);

        Task<EventoDto[]> GetAllEventosByTemaAsync(string tema);
        Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes= false);
        Task<EventoDto> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false);
    }
}