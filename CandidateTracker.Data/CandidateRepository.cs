using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CandidateTracker.Data
{
    public class CandidateRepository
    {
        private readonly string _connectionString;

        public CandidateRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddCandidate(Candidate c)
        {
            using var ctx = new CandidatesDataContext(_connectionString);
            ctx.Candidates.Add(c);
            ctx.SaveChanges();
        }

        public int GetCount(Status status)
        {
            using var ctx = new CandidatesDataContext(_connectionString);
            return ctx.Candidates.Count(c => c.Status == status);
        }

        public List<Candidate> GetCandidates(Status status)
        {
            using var ctx = new CandidatesDataContext(_connectionString);
            return ctx.Candidates.Where(c => c.Status == status).ToList();
        }

        public Candidate GetCandidate(int id)
        {
            using var ctx = new CandidatesDataContext(_connectionString);
            return ctx.Candidates.FirstOrDefault(c => c.Id == id);
        }

        public void UpdateStatus(int id, Status status)
        {
            using var ctx = new CandidatesDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"Update Candidates SET Status={status} WHERE Id={id}");
        }
    }
}
