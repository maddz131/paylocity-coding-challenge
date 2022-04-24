using BenefitsApi.Services;
using BenefitsApi.Repositories;
using NSubstitute;
using NUnit.Framework;

namespace BenefitsApiNunitTests;

public class Tests
{
    private IDependentRepository _dependentRepo;
    private IEmployeeRepository _employeeRepo;
    private IBenefitsRepository _benefitsRepo;

    [SetUp]
    public void Setup()
    {
        var _dependentRepo = Substitute.For<IDependentRepository>();
        var _employeeRepo = Substitute.For<IEmployeeRepository>();
        var _benefitsRepo = Substitute.For<IBenefitsRepository>();
    }

    [Test]
    public void Test()
    {
        var _benefitsService = new BenefitsService(_employeeRepo, _dependentRepo, _benefitsRepo);s
    }
}
