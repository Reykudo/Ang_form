using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Ang_form.Models
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(80)]
        public string Name { get; set; }
        public List<Message> Messages { get; set; }
    }
}
