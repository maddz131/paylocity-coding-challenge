using BenefitsApi.Dto;
using BenefitsApi.Repositories;
using BenefitsApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BenefitsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DependentController : ControllerBase
    {
        private readonly IDependentRepository _dependentRepo;
        private readonly IBenefitsService _benefitsService;
        public DependentController(IDependentRepository dependentRepo, IBenefitsService benefitsService)
        {
            _dependentRepo = dependentRepo;
            _benefitsService = benefitsService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDependentsByEmployeeId(int id)
        {
            try
            {
                var dependants = await _benefitsService.GetDependents(id);
                return Ok(dependants);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddDependent(DependentDto dependent)
        {
            try
            {
                await _benefitsService.AddDependent(dependent);
                return Ok();
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDependent(int id)
        {
            try
            {
                await _benefitsService.DeleteDependent(id);
                return Ok();
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }
    }
}
