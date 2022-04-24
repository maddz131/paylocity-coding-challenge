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
        private readonly BenefitsService _benefitsService;
        public DependentController(IDependentRepository dependentRepo, BenefitsService benefitsService)
        {
            _dependentRepo = dependentRepo;
            _benefitsService = benefitsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDependents()
        {
            try
            {
                var dependants = await _dependentRepo.GetAll();
                return Ok(dependants);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDependentsByEmployeeId(int id)
        {
            try
            {
                var dependants = await _benefitsService.GetDependentsByEmployeeId(id);
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
