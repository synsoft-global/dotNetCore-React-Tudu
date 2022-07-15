using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoDAL.Models
{
    public class TodoItemPagination
    {
        public int totalCount { get; set; } 
        public List<TodoItem> items { get; set; }

    }
}
