import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "jdgiskjd";

  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference=currentTime-createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
  }
  return (
    <div className="p-3 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt)==0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`} </p>

        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="h-4 w-4 text-black" />
        </Button>
      </div>

      <div className="flex items-center gap-1 [&_h1]:m-0 [&_p]:m-0">
        <Avatar>
          <AvatarImage
            src={job?.company?.logo}
            alt="Company logo"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg mt-1 mb-1">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap mt-2">
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
      <div className="flex items-center gap-3 mt-4">
        <Button
          onClick={() => navigate(`/jobs/description/${job?._id}`)}
          variant="outline"
          className="cursor-pointer"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] hover:bg-[#5a0791] text-white cursor-pointer">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
