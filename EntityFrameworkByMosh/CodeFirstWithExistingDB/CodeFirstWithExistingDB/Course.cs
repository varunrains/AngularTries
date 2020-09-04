namespace CodeFirstWithExistingDB
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Courses")]
    public partial class Course
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Course()
        {
            Tags = new HashSet<Tag>();
        }

        public int Id { get; set; }

        //Here the Title Property is changed to Name
        public string Name { get; set; }

        //DateTime is a Struct type and cannot be nullable
        //REmoving this property
        //public DateTime? DatePublished { get; set; }

        public string Description { get; set; }

        public int Level { get; set; }

        public float FullPrice { get; set; }

        public int? Author_Id { get; set; }
        //Remove this link before deleting  the Category class
        //public Category Category { get; set; }

        public virtual Author Author { get; set; }

        public virtual ICollection<Tag> Tags { get; set; }
    }
}
