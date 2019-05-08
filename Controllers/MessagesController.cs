using Ang_form.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ang_form.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public MessagesController(ApplicationContext context)
        {
            _context = context;
        }

        // POST: api/Messages
        [HttpPost]
        public async Task<IActionResult> PostMessage([FromBody] Message message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var findContact = _context.Contacts.Where(e => (e.Phone == message.Contact.Phone && e.Email == message.Contact.Email));

            if (findContact.Count() == 0) _context.Contacts.Add(message.Contact);
            else message.Contact = findContact.FirstOrDefault();

            message.Subject = _context.Subjects.Find(message.Subject.Id);
            message.SubjectId = message.Subject.Id;

            message.ContactId = message.Contact.Id;
            _context.Messages.Add(message);

            await _context.SaveChangesAsync();
            return Ok(message);
        }
    }
}