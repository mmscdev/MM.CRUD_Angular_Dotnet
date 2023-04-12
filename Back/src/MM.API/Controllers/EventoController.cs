using Microsoft.AspNetCore.Mvc;
using MM.Persistence;
using MM.Domain;

namespace MM.API.Controllers;

[ApiController]
[Route("[controller]")]
public class EventoController : ControllerBase
{
    private readonly ILogger<EventoController> _logger;

    public EventoController(ILogger<EventoController> logger, EventosContext context)
    {
        _logger = logger;
        Context = context;
    }


    [HttpGet]
    public IEnumerable<Evento> Get()
    {
        return Context.Eventos.ToList();
    } 
    
    [HttpGet("{id}")]
    public Evento? Get(int id)
    {
        return Context.Eventos.FirstOrDefault(_=> _.Id == id);
    }
}
