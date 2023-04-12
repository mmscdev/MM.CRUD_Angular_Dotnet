using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MM.Domain;

namespace MM.Persistence
{
    public class EventoPersist : IEventosInterface
    {
        private readonly EventosContext _context;
        public EventoPersist(EventosContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {            
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entity) where T : class
        {
            _context.RemoveRange(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (_context.SaveChanges()) > 0;
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public async Task<Evento[]> GetAllEventosAsync(string tema,bool includePalestrantes= false)
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
                         .Where(e => (e.Tema.ToLower().Contains(tema.ToLower()) ||
                                      e.Local.ToLower().Contains(tema.ToLower())))
                         .OrderBy(e => e.Id);

            return await query.ToArrayAsync();
        }


        public Task<Evento[]> GetAllEventosByTemaAsync(string tema)
        {
            throw new NotImplementedException();
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(string nome, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                .Include(p => p.RedesSociais);

            if (includeEventos)
            {
                query = query
                    .Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            } 
            
            query = query.AsNoTracking()
                         .Where(p => (p.MiniCurriculo.ToLower().Contains(nome.ToLower())))
                         .OrderBy(p => p.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos = false)
        { 
             IQueryable<Palestrante> query = _context.Palestrantes
                .Include(e => e.RedesSociais);

            if (includeEventos)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }
            query = query.AsNoTracking()
                         .Where(e => (e.MiniCurriculo == nome))
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

        public async Task<Palestrante> GetPalestranteByIdAsync(int userId, int eventoId, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                .Include(e => e.RedesSociais);

            if (includeEventos)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }
            query = query.AsNoTracking()
                         .Where(e => (e.Id == eventoId))
                         .OrderBy(e => e.Id);

            return await query.FirstOrDefaultAsync();
        }
    }
}