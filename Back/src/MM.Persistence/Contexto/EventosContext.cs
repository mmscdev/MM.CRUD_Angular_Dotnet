using Microsoft.EntityFrameworkCore;
using MM.Domain;

namespace MM.Persistence
{
    public class EventosContext : DbContext
    {
        public EventosContext(DbContextOptions<EventosContext> options): base(options)
        {

        }
        public DbSet<Evento> Eventos { get; set; } 
        public DbSet<Lote> Lotes { get; set; } 
        public DbSet<Palestrante> Palestrantes { get; set; } 
        public DbSet<PalestranteEvento> PalestranteEventos { get; set; } 
        public DbSet<RedeSocial> RedeSociais { get; set; } 

        protected override void OnModelCreating(ModelBuilder builder){
            builder.Entity<PalestranteEvento>()
            .HasKey(_ => new {_.EventoId, _.PalestranteId});

            builder.Entity<PalestranteEvento>()
                .HasKey(PE => new {PE.EventoId, PE.PalestranteId});

            builder.Entity<Evento>()
                .HasMany(e => e.RedesSociais)
                .WithOne(rs => rs.Evento)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Palestrante>()
                .HasMany(e => e.RedesSociais)
                .WithOne(rs => rs.Palestrante)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
