using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoDAL.Models;

namespace TodoDAL.Interface
{
    public interface ITodo
    {
        void AddTodoItem( TodoItem value);
        void UpdateTodoItem(int id, TodoItem value);

        TodoItem GetTodoItemById(int id);
        IList<TodoItem> GetAllTodoItem();

        TodoItemPagination GetAllTodoItemsPageWise(int PageNo);
        void DeleteTodoItem(int id);

    }
}
