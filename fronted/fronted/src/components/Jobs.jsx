import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (!searchedQuery) {
      setFilterJobs(allJobs);
      return;
    }

    const query = searchedQuery.toLowerCase();

    const filteredJobs = allJobs.filter((job) => {
      return (
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.jobType?.toLowerCase().includes(query)
      );
    });

    // If matching jobs exist, show filtered jobs.
    // Otherwise, show all jobs.
    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

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
            {filterJobs.length === 0 ? (
              <span>No jobs available</span>
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
