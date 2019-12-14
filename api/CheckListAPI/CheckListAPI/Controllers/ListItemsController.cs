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
    public class ListItemsController : ControllerBase
    {
        private readonly CheckListAPIContext _context;

        public ListItemsController(CheckListAPIContext context)
        {
            _context = context;
        }

        // GET: api/ListItems
        [HttpGet]
        public IEnumerable<ListItem> GetListItems()
        {
            return _context.ListItems;
        }

        // GET: api/ListItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetListItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var listItem = await _context.ListItems.FindAsync(id);

            if (listItem == null)
            {
                return NotFound();
            }

            return Ok(listItem);
        }

        // PUT: api/ListItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListItem([FromRoute] int id, [FromBody] ListItem listItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != listItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(listItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ListItems
        [HttpPost]
        public async Task<IActionResult> PostListItem([FromBody] ListItem listItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ListItems.Add(listItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetListItem", new { id = listItem.Id }, listItem);
        }

        // DELETE: api/ListItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var listItem = await _context.ListItems.FindAsync(id);
            if (listItem == null)
            {
                return NotFound();
            }

            _context.ListItems.Remove(listItem);
            await _context.SaveChangesAsync();

            return Ok(listItem);
        }

        private bool ListItemExists(int id)
        {
            return _context.ListItems.Any(e => e.Id == id);
        }
    }
}