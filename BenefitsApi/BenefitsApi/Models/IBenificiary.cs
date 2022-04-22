namespace BenefitsApi.Models
{
    public interface IBenificiary
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int BenefitsCost { get; set; }
        public bool Discount { get; set; }
    }
}
