namespace BenefitsApi.Models
{
    public class Dependent : IBenificiary
    {
        public int DependentId { get; set; }
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Relationship { get; set; }
        public int BenefitsCost { get; set; }
        public bool Discount { get; set; }
    }
}
