using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CheckListAPI.Models
{
    public class ListItem
    {
        public int Id { get; set; }
        public int ListId { get; set; }
        [StringLength(50)]
        public string Contents { get; set; }
        public bool IsChecked { get; set; }
    }
}
