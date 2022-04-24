using BenefitsApi.Repositories;
using BenefitsApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BenefitsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BenefitsController : ControllerBase
    {
        private readonly IBenefitsRepository _benefitsRepo;
        private readonly BenefitsService _benefitsService;
        public BenefitsController(IBenefitsRepository benefitsRepository, BenefitsService benefitsService)
        {
            _benefitsRepo = benefitsRepository;
            _benefitsService = benefitsService;
        }


        [HttpGet]
        public async Task<IActionResult> GetBenefitDetails()
        {
            try
            {
                var benefits = await _benefitsService.GetBenefitDetails(); //maybe don't need to go through service
                return Ok(benefits);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }
    }
}
