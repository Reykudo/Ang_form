using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Ang_form.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ContactId { get; set; }      // внешний ключ
        public Contact Contact { get; set; }    // навигационное свойство

        [Required]
        public int SubjectId { get; set; }      // внешний ключ
        public Subject Subject { get; set; }    // навигационное свойство

        [MaxLength(1000)]
        public string Text { get; set; }
    }
}
