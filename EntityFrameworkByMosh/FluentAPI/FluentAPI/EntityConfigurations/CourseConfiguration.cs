using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAnnotations;

namespace FluentAPI.EntityConfigurations
{
    public class CourseConfiguration : EntityTypeConfiguration<Course>
    {
        public CourseConfiguration()
        {
            //TO organize the code follow the below approach -> TABLE -> Primary Keys -> Properties -> Relations

            //If you want to change the table name
            ToTable("tbl_Course");

            //Primary keys
            HasKey(c => c.Id);

            //Property setting in alphabetical order
            Property(c => c.Description)
                .IsRequired()
                .HasMaxLength(2000);

            Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(255);

            HasRequired(c => c.Author)
            .WithMany(a => a.Courses)
            .HasForeignKey(c => c.AuthorId)
            .WillCascadeOnDelete(false);

            HasMany(c => c.Tags)
            .WithMany(a => a.Courses)
            .Map(m =>
            {
                m.ToTable("CourseTags");
                //We are starting with course hence CourseId should be first
                m.MapLeftKey("CourseId");
                m.MapRightKey("TagId");
            });

            HasRequired(c => c.Cover)
            .WithRequiredPrincipal(x => x.Course);

        }
    }
}
