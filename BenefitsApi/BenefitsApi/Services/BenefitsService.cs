using BenefitsApi.Dto;
using BenefitsApi.Models;
using BenefitsApi.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace BenefitsApi.Services
{
    public class BenefitsService
    {

        private readonly IEmployeeRepository _employeeRepo;
        private readonly IDependentRepository _dependentRepo;
        private readonly IBenefitsRepository _benefitsRepo;
        private readonly Benefits _benefits;

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

        public async Task<Benefits> GetBenefitDetails()
        {
            return await _benefitsRepo.GetDetails();
        }

        public async Task AddDependent(DependentDto dependentDto)
        {
            await _dependentRepo.Add(dependentDto);
            //calculate updated total cost on front-end
        }

        public async Task AddEmployee(EmployeeDto employeeDto)
        {
            await _employeeRepo.Add(employeeDto);
            //calculate total cost on front-end, maybe use .flat[] to flatten employees and dependents and then use .reduce to calc total cost based on benefitsCost
        }

        public async Task<IEnumerable<Dependent>> GetDependentsByEmployeeId(int id)
        {
            var dependents = await _dependentRepo.GetByEmployeeId(id);
            var benefits = await GetBenefitDetails();
            foreach (var dependent in dependents){
                dependent.Discount = calculateDiscount(dependent.FirstName, benefits.DependentBenefitsYearlyCost, benefits.PercentDiscount);
            }
            return dependents;

        }
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var employees = await _employeeRepo.GetAll();
            var benefits = await GetBenefitDetails();
            foreach (var employee in employees)
            {
                var dependents = await GetDependentsByEmployeeId(employee.EmployeeId);
                var dependentCount = dependents.Count();
                var totalDependentDiscounts = dependents.Sum(dependent => calculateDiscount(dependent.FirstName, benefits.DependentBenefitsYearlyCost, benefits.PercentDiscount));
                var employeeDiscount = calculateDiscount(employee.FirstName, benefits.EmployeeBenefitsYearlyCost, benefits.PercentDiscount);
                var totalDiscounts = totalDependentDiscounts + employeeDiscount;
                var totalCost = (dependentCount * benefits.DependentBenefitsYearlyCost) + benefits.EmployeeBenefitsYearlyCost - totalDiscounts;

                employee.Dependents = dependents.Count();
                employee.TotalDiscount = totalDiscounts;
                employee.TotalCost = totalCost;
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
    }
}
