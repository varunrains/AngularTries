namespace CodeFirstWithExistingDB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RenameTitleColumnToNameInCoursesTable : DbMigration
    {
        public override void Up()
        {
            //With this script if run we might loose the data that is present in the "Title" column
            //Be-careful with these kind of migration
            AddColumn("dbo.Courses", "Name", c => c.String());
            Sql("UPDATE dbo.Courses SET Name=Title");
            DropColumn("dbo.Courses", "Title");

            //You can use this method also to rename the column
           // RenameColumn("dbo.Courses","Title","Name");
        }
        
        //This will be used to Downgrade the Database to previous version
        //Make sure you check this also during Renaming scenarios
        public override void Down()
        {
            AddColumn("dbo.Courses", "Title", c => c.String());
            Sql("UPDATE dbo.Courses SET Title=Name");
            DropColumn("dbo.Courses", "Name");
        }
    }
}
