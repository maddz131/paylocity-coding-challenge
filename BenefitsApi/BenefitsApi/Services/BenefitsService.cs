using BenefitsApi.Dto;
using BenefitsApi.Models;
using BenefitsApi.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace BenefitsApi.Services
{
    public class BenefitsService : IBenefitsService
    {

        private readonly IEmployeeRepository _employeeRepo;
        private readonly IDependentRepository _dependentRepo;
        private readonly IBenefitsRepository _benefitsRepo;

        public BenefitsService(IEmployeeRepository employeeRepo, IDependentRepository dependentRepository, IBenefitsRepository benefitsRepository)
        {
            _employeeRepo = employeeRepo;
            _dependentRepo = dependentRepository;
            _benefitsRepo = benefitsRepository;
        }

        private bool applyDiscount(string name)
        {
            if (name != null && name[0].Equals('A'))
            {
                return true;
            }
            return false;
        }
        private int calculateDiscount(string name, int cost, int percentDiscount)
        {
            if (applyDiscount(name))
            {
                var multiplier = percentDiscount / (double)100;
                return (int)(cost * multiplier);
            }
            return 0;
        }
        public async Task<IEnumerable<Dependent>> GetDependents(int id)
        {
            var dependents = await _dependentRepo.GetByEmployeeId(id);
            var benefits = await GetBenefitDetails();
            foreach (var dependent in dependents){
                dependent.Discount = calculateDiscount(dependent.FirstName, benefits.DependentBenefitsYearlyCost, benefits.PercentDiscount);
                dependent.Cost = benefits.DependentBenefitsYearlyCost;
            }
            return dependents;
        }
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var employees = await _employeeRepo.GetAll();
            var benefits = await GetBenefitDetails();
            foreach (var employee in employees)
            {
                employee.Cost = benefits.EmployeeBenefitsYearlyCost;
                employee.Dependents = await GetDependents(employee.EmployeeId);
                employee.Discount = calculateDiscount(employee.FirstName, benefits.EmployeeBenefitsYearlyCost, benefits.PercentDiscount);
            }
            return employees;
        }
        public async Task DeleteEmployee(int id)
        {
            await _dependentRepo.DeleteByEmployeeId(id);
            await _employeeRepo.Delete(id);
        }
        public async Task DeleteDependent(int id)
        {
            await _dependentRepo.Delete(id);
        }
        public async Task AddEmployee(EmployeeDto employeeDto)
        {
            await _employeeRepo.Add(employeeDto);
        }
        public async Task AddDependent(DependentDto dependentDto)
        {
            await _dependentRepo.Add(dependentDto);
        }
        public async Task<Benefits> GetBenefitDetails()
        {
            return await _benefitsRepo.GetDetails();
        }
    }
}
