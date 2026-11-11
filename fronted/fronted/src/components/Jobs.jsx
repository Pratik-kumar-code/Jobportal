import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery, jobsLoading, jobsError } = useSelector((store) => store.job);

  const query = searchedQuery.trim().toLowerCase();
  const filterJobs = query
    ? allJobs.filter((job) =>
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.jobType?.toLowerCase().includes(query)
      )
    : allJobs;

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5 items-start">
          {/* Filter Section */}
          <div className="w-56 shrink-0">
            <FilterCard />
          </div>

          {/* Jobs Section */}
          <div className="flex-1 min-w-0 h-[88vh] overflow-y-auto pb-5">
            {jobsLoading ? (
              <span role="status">Loading jobs...</span>
            ) : jobsError ? (
              <span className="text-red-600" role="alert">{jobsError}</span>
            ) : filterJobs.length === 0 ? (
              <span>
                No jobs found{searchedQuery ? ` for "${searchedQuery}"` : ""}.
              </span>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{opacity:0,x:-100}}
                    transition={{duration:0.3}}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
