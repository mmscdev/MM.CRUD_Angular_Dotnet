using System.Threading.Tasks;
using MM.Domain;

namespace MM.Persistence.Interfaces
{
    public interface IPalestrantePersist : IGeralPersist
    {
        Task<Palestrante> GetAllPalestrantesAsync(bool includeEventos = false);
        Task<Palestrante> GetPalestranteByUserIdAsync(int userId, bool includeEventos = false);
    }
}