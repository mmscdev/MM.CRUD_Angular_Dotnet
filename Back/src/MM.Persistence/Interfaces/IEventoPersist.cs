using MM.Domain;

namespace MM.Persistence.Interfaces
{
public interface IEventoPersist
    {

        Task<Evento[]> GetAllEventosByTemaAsync(string tema);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes= false);
        Task<Evento> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false);
    }
}