using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CheckListAPI.Models
{
    public class CheckListAPIContext : DbContext
    {
        public CheckListAPIContext (DbContextOptions<CheckListAPIContext> options)
            : base(options)
        {
        }

        public DbSet<List> Lists { get; set; }
        public DbSet<ListItem> ListItems { get; set; }
    }
}
