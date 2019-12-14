using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CheckListAPI.Models;

namespace CheckListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly CheckListAPIContext _context;

        public ListsController(CheckListAPIContext context)
        {
            _context = context;
        }

        // GET: api/Lists
        [HttpGet]
        public IEnumerable<List> GetLists()
        {

            return _context.Lists;
        }

        // GET: api/Lists/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetListById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var items = await _context.ListItems.Where(x => x.ListId == id).ToListAsync();

            if (items == null)
            {
                return NotFound();
            }

            return Ok(items);
        }

        // POST: api/Lists
        // body: list name
        [HttpPost]
        public async Task<IActionResult> CreateList([FromBody] string listName)
        {
            var newList = new List();

            newList.ListName = listName;

            _context.Lists.Add(newList);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLists", new { id = newList.Id }, newList);
        }

        // DELETE: api/Lists
        // body: id
        [HttpDelete]
        public async Task<IActionResult> DeleteList([FromBody] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var list = await _context.Lists.FindAsync(id);
            if (list == null)
            {
                return NotFound();
            }

            _context.Lists.Remove(list);
            await _context.SaveChangesAsync();

            return Ok(list);
        }

        private bool ListExists(int id)
        {
            return _context.Lists.Any(e => e.Id == id);
        }
    }
}