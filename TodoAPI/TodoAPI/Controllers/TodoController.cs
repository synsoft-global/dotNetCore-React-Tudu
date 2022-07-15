using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TodoDAL.Models;
using TodoDAL.Context;
using TodoDAL.Interface;
using System;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private ITodo _ITodoRepo;

        public TodoController(ITodo ITodoRepo)
        {
            _ITodoRepo = ITodoRepo;
        }

        //The method is used to fetch all the todo items.
        [HttpGet("GetAllTodoItems")]
        public Response GetAllTodoItems()
        {
            Response response = new Response();
            try
            {
                response.Status = true;
                response.Message = "";
                response.Result = _ITodoRepo.GetAllTodoItem();

            }
            catch (Exception e)
            {
                response.Status = false;
                response.Message = e.Message;
                response.Result = null;
            }
            return response;
        }

        //The method is used to fetch page wise todo items.
        [HttpGet("GetAllTodoItemsPageWise")]
        public Response GetAllTodoItemsPageWise(int PageNo = 0)
        {
            Response response = new Response();
            try
            {
                response.Status = true;
                response.Message = "";
                response.Result = _ITodoRepo.GetAllTodoItemsPageWise(PageNo);

            }
            catch (Exception e)
            {
                response.Status = false;
                response.Message = e.Message;
                response.Result = null;
            }
            return response;
        }

        //The method is used to fetch individual todo item by its id.
        [HttpGet("GetTodoItemById/{id}")]
        public Response GetTodoItemById(int id)
        {
            Response response = new Response();
            try
            {
                response.Status = true;
                response.Message = "";
                response.Result = _ITodoRepo.GetTodoItemById(id);

            }
            catch (Exception e)
            {
                response.Status = false;
                response.Message = e.Message;
                response.Result = null;
            }
            return response;

        }

        //The method is used to add item in todo list.
        [HttpPost("AddTodoItem")]
        public Response AddTodoItem([FromBody] TodoItem value)
        {
            Response response = new Response();
            try
            {
                if (ModelState.IsValid)
                {
                    _ITodoRepo.AddTodoItem(value);
                    response.Status = true;
                    response.Message = ResourceFiles.ResourceUS.DataSavedMessage;
                }

            }
            catch (Exception e)
            {
                response.Status = false;
                response.Message = e.Message;
            }
            return response;

        }

        //The method is used to update specific todo item.
        [HttpPut("UpdateTodoItem/{id}")]
        public Response UpdateTodoItem(int id, [FromBody] TodoItem value)
        {
            Response response = new Response();
            try
            {
                if (ModelState.IsValid)
                {
                    _ITodoRepo.UpdateTodoItem(id, value);
                    response.Status = true;
                    response.Message = ResourceFiles.ResourceUS.DataUpdatedMessage;
                }

            }
            catch (Exception e)
            {
                response.Status = false;
                response.Message = e.Message;
                response.Result = null;
            }
            return response;

        }

        //The method is used to delete todo item.
        [HttpDelete("DeleteTodoItem/{id}")]
        public Response DeleteTodoItem(int id = 0)
        {
            Response response = new Response();
            try
            {
                _ITodoRepo.DeleteTodoItem(id);
                response.Status = true;
                response.Message = ResourceFiles.ResourceUS.DataDeletedMessage;


            }
            catch (Exception e)
            {
                response.Status = false;
                response.Message = e.Message;
            }
            return response;


        }
    }
}
