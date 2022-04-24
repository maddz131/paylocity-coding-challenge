namespace BenefitsApi.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int Dependents { get; set; }
        public int TotalDiscount { get; set; }
        public int TotalCost { get; set; }

    }
}
