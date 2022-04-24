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
        private readonly Benefits _benefits;

        public BenefitsService(IEmployeeRepository employeeRepo, IDependentRepository dependentRepository, Benefits benefits)
        {
            _employeeRepo = employeeRepo;
            _dependentRepo = dependentRepository;
            _benefits = benefits;
        }

        private bool applyDiscount(string name)
        {
            if (name != null && name[0].Equals('A'))
            {
                return true;
            }
            return false;
        }

        private int calculateDiscount(string name, int cost)
        {
            if (applyDiscount(name))
            {
                var multiplier = _benefits.percentDiscount / (double)100;
                return (int)(cost * multiplier);
            }
            return 0;
        }

        private int getSalary() //might want to limit this to employees somehow
        {
            return _benefits.monthlyPay * _benefits.payCycles;
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
            /*foreach (var dependent in dependents)
            {
                var hasDiscount = calculateDiscount(dependent.FirstName);
                var finalCost = calculateFinalCost(_benefits.dependentCost, hasDiscount);
                dependent.BenefitsCost = finalCost;
                dependent.Discount = hasDiscount;
            }*/
            return dependents;
        }

        public async Task<int> GetDependentCountByEmployeeId(int id)
        {
            return await _dependentRepo.GetCountByEmployeeId(id);
        }

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var employees = await _employeeRepo.GetAll();
            foreach (var employee in employees)
            {
                employee.Salary = getSalary();
                employee.Dependents = await GetDependentCountByEmployeeId(employee.EmployeeId);
                employee.BenefitsCost = _benefits.employeeCost;
                employee.Discount = calculateDiscount(employee.FirstName, _benefits.employeeCost);
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
