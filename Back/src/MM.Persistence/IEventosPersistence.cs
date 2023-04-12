using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MM.Domain;

namespace MM.Persistence
{
    public interface IEventosInterface
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entity) where T : class;
        Task<bool> SaveChangesAsync();

        Task<Evento[]> GetAllEventosByTemaAsync(string tema);
        Task<Evento[]> GetAllEventosAsync(string tema,bool includePalestrantes= false);
        Task<Evento> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false);

        
        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos = false);
        Task<Palestrante[]> GetAllPalestrantesAsync(string nome, bool includeEventos = false);
        Task<Palestrante> GetPalestranteByIdAsync(int userId, int eventoId, bool includeEventos = false);
    }
}