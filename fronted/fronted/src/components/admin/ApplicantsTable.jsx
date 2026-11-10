import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
const { applicants } = useSelector((store) => store.application);
const statusHandler=async(status,id)=>{
  try{
      const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
      }
  }catch(error){
    toast.error(error.response.data.message);
  }
}

  return (
    <div className="w-full">
      <Table>
        <TableCaption className="mt-4 text-gray-500">
          A list of your recent applied users
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700">
              Full Name
            </TableHead>
            <TableHead className="font-semibold text-gray-700">Email</TableHead>
            <TableHead className="font-semibold text-gray-700">
              Contact
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Resume
            </TableHead>
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">
                  {item?.applicant?.fullname}
                </TableCell>

                <TableCell className="text-gray-600">{item?.applicant?.email}</TableCell>

                <TableCell className="text-gray-600">{item?.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  <span >
                    {
                      item.applicant?.profile?.resume ? <a className="text-purple-600 cursor-pointer hover:underline" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a>: <span>NA</span>
                    }
                    
                  </span>
                </TableCell>

                <TableCell className="text-gray-600">{item?.applicant?.createdAt.split("T")[0]}</TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5 text-gray-700" />
                    </PopoverTrigger>

                    <PopoverContent
                      align="end"
                      className="w-32 rounded-md border border-gray-200 bg-white p-1 shadow-md"
                    >
                      {shortlistingStatus.map((status, index) => (
                        <div
                        onClick={()=> statusHandler(status,item?._id)}
                          key={index}
                          className="flex h-8 items-center rounded-sm px-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
