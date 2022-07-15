using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoDAL.Context;
using TodoDAL.Interface;
using TodoDAL.Models;

namespace TodoDAL.Repositories
{
    public class TodoRepository : ITodo
    {
        private TodoContext _todoContext;

        public TodoRepository(TodoContext todoContext)
        {
            _todoContext = todoContext;
        }

        public void AddTodoItem(TodoItem value)
        {
            
            _todoContext.TodoItem.Add(value);
            _todoContext.SaveChanges();
        }

        public void DeleteTodoItem(int id)
        {

            var todoItem = _todoContext.TodoItem.FirstOrDefault(x => x.Id == id);
            if (todoItem != null)
            {
                _todoContext.TodoItem.Remove(todoItem);
                _todoContext.SaveChanges();
            }
            else
            {
                throw new Exception("Id not found");
            }
        }

        public IList<TodoItem> GetAllTodoItem()
        {
            return _todoContext.TodoItem.ToList();
        }

        public TodoItemPagination GetAllTodoItemsPageWise(int pageNo)
        {
            TodoItemPagination items = new TodoItemPagination();
            items.totalCount = _todoContext.TodoItem.Count();
            items.items = _todoContext.TodoItem.Skip(pageNo * 10).Take(10).ToList();

            return items; 
        }


        
        public TodoItem GetTodoItemById(int id)
        {
            return _todoContext.TodoItem.FirstOrDefault(x => x.Id == id);
        }

        public void UpdateTodoItem(int id, TodoItem value)
        {
            var item = _todoContext.TodoItem.FirstOrDefault(x => x.Id == id);
            if (item != null)
            {
                item.Name = value.Name;
                item.IsComplete = value.IsComplete;
                _todoContext.TodoItem.Update(item);
                _todoContext.SaveChanges();
            }
        }
    }
}
