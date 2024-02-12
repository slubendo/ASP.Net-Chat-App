using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatApp.Web.Models;
using Microsoft.AspNetCore.SignalR;
using ChatApp.Web.Hubs;

namespace MyApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
  private readonly DatabaseContext _context;
  private readonly IHubContext<ChatHub> _hubContext;

  public MessagesController(DatabaseContext context, IHubContext<ChatHub> hubContext)
  {
    _context = context;
    _hubContext = hubContext;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Message>>> GetMessageItems()
  {
    return await _context.Messages.ToListAsync();
  }

  [HttpPost]
  public async Task<ActionResult<Message>> PostMessageItem(Message Message)
  {
    _context.Messages.Add(Message);
    await _context.SaveChangesAsync();

    await _hubContext.Clients.All.SendAsync("ReceiveMessage", Message);

    return CreatedAtAction(nameof(GetMessageItems), new { id = Message.Id }, Message);
  }
}