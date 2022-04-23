using BenefitsApi.Context;
using BenefitsApi.Dto;
using BenefitsApi.Models;
using Dapper;
using System.Data;

namespace BenefitsApi.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DapperContext _context;
        public EmployeeRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAll()
        {
            var query = "SELECT * FROM dbo.Employee";
            using (var connection = _context.CreateConnection())
            {
                var employees = await connection.QueryAsync<Employee>(query);
                return employees.ToList();
            }
        }

        public async Task Add(EmployeeDto employeeDto)
        {
            var query = "INSERT INTO dbo.Employee " +
                        "VALUES (@FirstName, @LastName)";

            var parameters = new DynamicParameters();
            parameters.Add("FirstName", employeeDto.FirstName, DbType.String);
            parameters.Add("LastName", employeeDto.LastName, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task Delete(int id)
        {
            var query = "Delete From dbo.Employee " +
            "Where EmployeeID = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { Id = id });
            }
        }

        /*public async Task<Employee> UpdateDependentCount(EmployeeDto employeeDto)
        {
        }*/
    }
}
