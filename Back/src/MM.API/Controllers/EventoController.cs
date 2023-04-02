using Microsoft.AspNetCore.Mvc;
using MM.API.Models;

namespace MM.API.Controllers;

[ApiController]
[Route("[controller]")]
public class EventoController : ControllerBase
{
    private IEnumerable<Evento> _eventos = new Evento[]
    {
         new Evento{ 
            EventoId = 1,
            Tema = "Curso Angular 11 e .NET 5",
            Local = "Belo Horizonte",
            Lote = "1° Lote",
            QtdPessoas = 256,
            DataEvento = DateTime.Now.AddDays(2).ToString(),
            ImagemURL = "GOTO.png"
          },
           new Evento{ 
            EventoId = 2,
            Tema = "Show ColdPlay",
            Local = "Belo Horizonte",
            Lote = "1° Lote",
            QtdPessoas = 5000,
            DataEvento = DateTime.Now.AddDays(2).ToString(),
            ImagemURL = "GOTO.png"
          }
    };

    private readonly ILogger<EventoController> _logger;

    public EventoController(ILogger<EventoController> logger)
    {
        _logger = logger;
    }

    [HttpPost(Name = "PostEvento")]
    public string Post()
    {
        return "value";
    }  
    [HttpGet("{id}")]
    public IEnumerable<Evento> Get(int id)
    {
        return _eventos.Where(_  => _.EventoId == id);
    }
    [HttpGet(Name = "GetEvento")]
    public IEnumerable<Evento> Get()
    {
        return _eventos;
    }
}
