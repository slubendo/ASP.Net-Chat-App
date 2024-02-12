using Microsoft.EntityFrameworkCore;

namespace ChatApp.Web.Models;

public class DatabaseContext : DbContext
{
  public DatabaseContext(DbContextOptions<DatabaseContext> options)
      : base(options) { }

  public DbSet<Message> Messages => Set<Message>();
}