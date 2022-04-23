using BenefitsApi.Context;
using BenefitsApi.Dto;
using BenefitsApi.Models;
using Dapper;
using System.Data;

namespace BenefitsApi.Repositories
{
    //still need to add remove functions
    public class DependentRepository : IDependentRepository
    {
        private readonly DapperContext _context;
        public DependentRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Dependent>> GetAll()
        {
            var query = "SELECT * FROM dbo.Dependent";
            using (var connection = _context.CreateConnection())
            {
                var dependants = await connection.QueryAsync<Dependent>(query);
                return dependants.ToList();
            }
        }
        public async Task<IEnumerable<Dependent>> GetByEmployeeId(int id)
        {
            var query = "SELECT * FROM dbo.Dependent WHERE EmployeeID = @id";
            using (var connection = _context.CreateConnection())
            {
                var dependants = await connection.QueryAsync<Dependent>(query, new { id });
                return dependants.ToList();
            }
        }
        public async Task<int> GetCountByEmployeeId(int id)
        {
            var query = "SELECT COUNT(DependentID) FROM dbo.Dependent WHERE EmployeeID = @id";
            using (var connection = _context.CreateConnection())
            {
                return await connection.ExecuteScalarAsync<int>(query, new { id });
            }
        }
        public async Task Add(DependentDto dependentDto)
        {
            var query = "INSERT INTO dbo.Dependent " +
                        "VALUES (@FirstName, @LastName, @Relationship," +
                        "@EmployeeID)";

            var parameters = new DynamicParameters();
            parameters.Add("FirstName", dependentDto.FirstName, DbType.String);
            parameters.Add("LastName", dependentDto.LastName, DbType.String);
            parameters.Add("EmployeeID", dependentDto.EmployeeId, DbType.Int32);
            parameters.Add("Relationship", dependentDto.Relationship, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }
        public async Task Delete(int id)
        {
            var query = "Delete From dbo.Dependent " +
            "Where EmployeeID = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { Id = id });
            }
        }
    }
}