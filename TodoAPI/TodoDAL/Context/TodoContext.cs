namespace TodoDAL.Context
{
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions options)
           : base(options)
        {

        }

        public DbSet<TodoItem> TodoItem { get; set; }

    }
}
