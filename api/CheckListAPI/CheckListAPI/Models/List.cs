using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CheckListAPI.Models
{
    public class List
    {
        public int Id { get; set; }

        [StringLength(20)]
        public string ListName { get; set; }
  
    }
}
