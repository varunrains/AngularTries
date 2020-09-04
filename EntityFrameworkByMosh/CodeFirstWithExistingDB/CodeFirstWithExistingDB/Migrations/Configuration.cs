namespace CodeFirstWithExistingDB.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<CodeFirstWithExistingDB.PlutoDBContext>
    {
        public Configuration()
        {
            //There are two features for migration
            //CODE first migration and Automatic migration
            //Microsoft will disable Automatic migration as there are high risks in the production environment
            //And also this feature will be removed from the EF in coming days.
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CodeFirstWithExistingDB.PlutoDBContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
        }
    }
}
