using Ang_form.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SRVTextToImage;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Ang_form.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaptchaController : Controller
    {
        private readonly ApplicationContext _context;

        public CaptchaController(ApplicationContext context)
        {
            _context = context;
        }

        private string RndStr(int count)
        {
            Random random = new Random();
            string res = "";
            for(int i = 0; i<count; i++)
            {
                res += random.Next(0,9).ToString();
            }
            return res;
        }

        // GET: api/Captcha
        [HttpGet]
        public FileResult GetImage()
        {
            CaptchaRandomImage cr = new CaptchaRandomImage();

            HttpContext.Session.SetString("CaptchaImageText", RndStr(5));
            cr.GenerateImage(
                HttpContext.Session.GetString("CaptchaImageText"),
                140,
                30,
                Color.Orange,
                Color.White
                );
            MemoryStream ms = new MemoryStream();

            cr.Image.Save(ms, ImageFormat.Png);
            ms.Seek(0, SeekOrigin.Begin);
            return new FileStreamResult(ms, "image/png");
        }

        [HttpPost]
        public IActionResult Check([FromBody] Captcha captcha)
        {
            return Ok(captcha.CaptchaCode == HttpContext.Session.GetString("CaptchaImageText"));
        }
    }
}