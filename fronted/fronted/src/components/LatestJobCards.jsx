import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/jobs/description/${job._id}`)}
            className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
        >
            <div>
                <h1 className="text-lg font-medium m-1">
                    {job?.company?.name}
                </h1>
                <p className="text-sm text-gray-500 m-1">India</p>
            </div>

            <div className="my-4">
                <h1 className="text-lg font-bold my-2">
                    {job?.title}
                </h1>
                <p className="text-sm text-gray-600">
                    {job?.description}
                </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                <Badge className="text-blue-700 font-bold" variant="ghost">
                    {job?.position} Positions
                </Badge>

                <Badge className="text-[#6A38C2] font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>

                <Badge className="text-[#F83002] font-bold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;