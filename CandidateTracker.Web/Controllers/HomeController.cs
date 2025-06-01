using CandidateTracker.Data;
using CandidateTracker.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace CandidateTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly string _connectionString;

        public HomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost("addcandidate")]
        public void AddCandidate(Candidate c)
        {
            CandidateRepository repo = new(_connectionString);
            repo.AddCandidate(c);
        }

        [Route("getcounts")]
        public CountsViewModel GetCounts()
        {
            CandidateRepository repo = new(_connectionString);
            return new CountsViewModel()
            {
                Pending = repo.GetCount(Status.Pending),
                Confirmed = repo.GetCount(Status.Confirmed),
                Rejected = repo.GetCount(Status.Rejected)
            };
        }

        [Route("getcandidates")]
        public List<Candidate> GetCandidates(string status)
        {
            CandidateRepository repo = new(_connectionString);
            return repo.GetCandidates(GetStatus(status));
        }

        [Route("getdetails")]
        public Candidate GetCandidate(int id)
        {
            CandidateRepository repo = new(_connectionString);
            return repo.GetCandidate(id);
        }

        [HttpPost("updatestatus")]
        public void Update(StatusViewModel vm)
        {
            CandidateRepository repo = new(_connectionString);
            repo.UpdateStatus(vm.Id, GetStatus(vm.Status));
            Console.WriteLine(vm.Id);
        }

        public Status GetStatus(string status)
        {
            if(status == "pending")
            {
                return Status.Pending;
            }
            if(status == "confirmed")
            {
                return Status.Confirmed;
            }
            return Status.Rejected;
        }
    }
}
