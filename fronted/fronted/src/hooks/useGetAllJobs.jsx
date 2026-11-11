import {
    cancelJobsRequest,
    failJobsRequest,
    finishJobsRequest,
    startJobsRequest,
} from '@/redux/jobSlice'
import { nanoid } from '@reduxjs/toolkit'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = (isSearchPage = false) => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const keyword = isSearchPage
        ? searchedQuery.trim().replace(/\s+/g, ' ')
        : '';

    useEffect(() => {
        const controller = new AbortController();
        const requestId = nanoid();

        dispatch(startJobsRequest({ requestId, query: keyword }));

        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(keyword || "")}`,
                    { withCredentials: true, signal: controller.signal }
                );

                if (res.data.success) {
                    dispatch(finishJobsRequest({ requestId, jobs: res.data.jobs }));
                } else {
                    dispatch(failJobsRequest({
                        requestId,
                        message: res.data.message || "Unable to load jobs. Please try again.",
                    }));
                }
            } catch (error) {
                if (controller.signal.aborted) return;
                console.error("Failed to fetch jobs:", error);
                dispatch(failJobsRequest({
                    requestId,
                    message: error.response?.data?.message || "Unable to load jobs. Please try again.",
                }));
            }
        };

        fetchAllJobs();

        return () => {
            controller.abort();
            dispatch(cancelJobsRequest({ requestId }));
        };
    }, [dispatch, keyword]);
};

export default useGetAllJobs;