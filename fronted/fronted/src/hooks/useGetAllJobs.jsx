import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = (isSearchPage = false) => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const keyword = isSearchPage ? searchedQuery : "";

                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(keyword || "")}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery, isSearchPage]);
};

export default useGetAllJobs;