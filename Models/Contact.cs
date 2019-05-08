using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Ang_form.Models
{
    public class Contact
    {
        [Key] 
        public int Id { get; set; }

        [Required]
        [MaxLength(80)]
        public string Name { get; set; }

        [Required]
        [MaxLength(256)]
        public string Email { get; set; }

        [Required]
        [MaxLength(10)]
        public string Phone { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
