import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id,
    ) || false;

  const [ isApplied, setIsApplied ] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setIsApplied(true); //update the local state
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob)); //help to update real time UI
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              application => application.applicant == user?._id
            )
          ) //Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className=" pb-4 max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl text-gray-900">
            {singleJob?.title}
          </h1>

          <div className="flex items-center gap-3 flex-wrap mt-3">
            <Badge className="!bg-blue-50 !text-blue-700 border border-blue-200 px-3 py-1 rounded-full">
              {singleJob?.position} Positions
            </Badge>

            <Badge className="!bg-purple-50 !text-[#6A38C2] border border-purple-200 px-3 py-1 rounded-full">
              {singleJob?.jobType}
            </Badge>

            <Badge className="!bg-orange-50 !text-[#F83002] border border-orange-200 px-3 py-1 rounded-full">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          className={`rounded-lg text-white ${
            isApplied
              ? "bg-gray-600 hover:bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad] cursor-pointer"
          }`}
          disabled={isApplied}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-gray-300 font-semibold text-lg py-2 m-2">
        Job Description
      </h1>

      <div className="py-4 space-y-3 text-base">
        <p className="font-bold  text-black">
          Role:{" "}
          <span className="ml-2 font-normal text-gray-700">
            {singleJob?.title}
          </span>
        </p>

        <p className="font-bold text-black">
          Location:{" "}
          <span className="ml-2 font-normal text-gray-700">
            {singleJob?.location}
          </span>
        </p>

        <p className="font-bold  text-black">
          Description:{" "}
          <span className="ml-2 font-normal text-gray-700">
            {singleJob?.description}
          </span>
        </p>

        <p className="font-bold  text-black">
          Experience:{" "}
          <span className="ml-2 font-normal text-gray-700">
            {singleJob?.experienceLevel} yrs
          </span>
        </p>

        <p className="font-bold  text-black">
          Salary:{" "}
          <span className="ml-2 font-normal text-gray-700">
            {singleJob?.salary} LPA
          </span>
        </p>

        <p className="font-bold  text-black">
          Total Applicants:{" "}
          <span className="ml-2 font-normal text-gray-700">
            {singleJob?.applications?.length}
          </span>
        </p>

        <p className="font-bold  text-black">
          Posted Date:{" "}
          <span className="ml-2 font-normal text-gray-700">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
