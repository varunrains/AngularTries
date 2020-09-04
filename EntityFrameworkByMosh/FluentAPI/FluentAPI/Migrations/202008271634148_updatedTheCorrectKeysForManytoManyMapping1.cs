namespace FluentAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatedTheCorrectKeysForManytoManyMapping1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CourseTags", "CourseId", "dbo.Courses");
            DropPrimaryKey("dbo.Courses");
            CreateTable(
                "dbo.Covers",
                c => new
                    {
                        CoverId = c.Int(nullable: false, identity: true),
                        CourseId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CoverId);
            
            AlterColumn("dbo.Courses", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Courses", "Id");
            CreateIndex("dbo.Courses", "Id");
            AddForeignKey("dbo.Courses", "Id", "dbo.Covers", "CoverId");
            AddForeignKey("dbo.CourseTags", "CourseId", "dbo.Courses", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CourseTags", "CourseId", "dbo.Courses");
            DropForeignKey("dbo.Courses", "Id", "dbo.Covers");
            DropIndex("dbo.Courses", new[] { "Id" });
            DropPrimaryKey("dbo.Courses");
            AlterColumn("dbo.Courses", "Id", c => c.Int(nullable: false, identity: true));
            DropTable("dbo.Covers");
            AddPrimaryKey("dbo.Courses", "Id");
            AddForeignKey("dbo.CourseTags", "CourseId", "dbo.Courses", "Id", cascadeDelete: true);
        }
    }
}
