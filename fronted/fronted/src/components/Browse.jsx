import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Browse = () => {

    useGetAllJobs(true);

    const { allJobs, searchedQuery, jobsLoading, jobsError, jobsQuery } = useSelector(store => store.job);
    const query = searchedQuery.trim().replace(/\s+/g, " ");
    const isLoading = jobsLoading || jobsQuery !== query;

    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto my-10'>

                <h1 className='font-bold text-xl my-10'>
                    Search Results ({allJobs.length})
                </h1>

                <div className='grid grid-cols-3 gap-4'>

                    {isLoading ? (
                        <p className="text-gray-500" role="status">Loading jobs...</p>
                    ) : jobsError ? (
                        <p className="text-red-600" role="alert">{jobsError}</p>
                    ) : allJobs.length === 0 ? (
                        <p className="text-gray-500">
                            No jobs found{query ? ` for "${query}"` : ""}.
                        </p>
                    ) : (
                        allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))
                    )}

                </div>

            </div>
        </div>
    )
}

export default Browse