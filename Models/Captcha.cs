using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ang_form.Models
{
    public class Captcha
    {
        [Required]
        [StringLength(5)]
        public string CaptchaCode { get; set; }
    }
}
