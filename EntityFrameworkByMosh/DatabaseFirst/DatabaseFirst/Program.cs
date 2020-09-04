namespace DatabaseFirst
{
    public enum Level : byte
    {
        Beginner = 1,
        Intermediate = 2,
        Advanced = 3
    }

    class Program
    {
        

        static void Main(string[] args)
        {
            var course = new Course();
            course.Level = CourseLevel.Intermediate;
        }
    }
}
