using BenefitsApi.Dto;
using BenefitsApi.Models;

namespace BenefitsApi.Services
{
    public interface IBenefitsService
    {
        public Task<IEnumerable<Dependent>> GetDependents(int id);
        public Task<IEnumerable<Employee>> GetEmployees();
        public Task DeleteEmployee(int id);
        public Task DeleteDependent(int id);
        public Task AddDependent(DependentDto dependentDto);
        public Task AddEmployee(EmployeeDto employeeDto);
        public Task<Benefits> GetBenefitDetails();

    }
}
