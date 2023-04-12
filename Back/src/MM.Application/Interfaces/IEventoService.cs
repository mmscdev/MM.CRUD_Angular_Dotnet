using MM.Domain;

namespace MM.Application.Contratos
{
    public interface IEventoService
    { 
        Task<Evento> AddEventos(int userId, Evento model);
        Task<Evento> UpdateEvento(int userId, int eventoId, Evento model);
        Task<bool> DeleteEvento(int userId, int eventoId);

        Task<Evento[]> GetAllEventosByTemaAsync(string tema);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes= false);
        Task<Evento> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false);
    }
}