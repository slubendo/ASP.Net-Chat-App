using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatApp.Web.Models;

namespace MyApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
  private readonly DatabaseContext _context;

  public MessagesController(DatabaseContext context)
  {
    _context = context;
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

    return CreatedAtAction(nameof(GetMessageItems), new { id = Message.Id }, Message);
  }
}