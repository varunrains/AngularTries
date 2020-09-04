using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAnnotations;

namespace FluentAPI
{
    public class Cover
    {
        public int CoverId { get; set; }
        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
    }
}
