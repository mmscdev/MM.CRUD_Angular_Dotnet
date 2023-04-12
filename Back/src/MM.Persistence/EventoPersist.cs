using Microsoft.EntityFrameworkCore;
using MM.Domain;
using MM.Persistence.Interfaces;

namespace MM.Persistence
{
    public class EventoPersist : IEventoPersist
    {
        private readonly EventosContext _context;
        public EventoPersist(EventosContext context)
        {
            _context = context;
        }
        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes= false)
        {
           IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }
            query = query.AsNoTracking()
                         .OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }


        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema)
        { 
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (true)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }
            query = query.AsNoTracking()
                         .Where(e => (e.Tema.ToLower().Contains(tema.ToLower()) ||
                                      e.Local.ToLower().Contains(tema.ToLower())))
                         .OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }


        public async Task<Evento> GetEventoByIdAsync(int userId, int eventoId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }
            query = query.AsNoTracking()
                         .Where(e => (e.Id == eventoId))
                         .OrderBy(e => e.Id);

            return await query.FirstOrDefaultAsync();
        }
    }
}