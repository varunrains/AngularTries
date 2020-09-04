using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAnnotations
{
    public class Course
    {
        public Course()
        {
            Tags = new HashSet<Tag>();
        }

        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        [MaxLength(2000)]
        public string Description { get; set; }

        public int Level { get; set; }

        public float FullPrice { get; set; }

        //Navigation Property of Author
        //Data Annotations are bad because they use magic strings
        //If the Author navigation is renamed then this will break 
        [ForeignKey("Author")]
        public int AuthorId { get; set; }

        public virtual Author Author { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }
    }
}