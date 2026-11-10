import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div> 
      <Table>
        <TableCaption>list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You haven't applied any job yet.</span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-gray-50 transition-colors border-b border-gray-200"
              >
                <TableCell className="py-4 text-gray-600 font-medium">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="py-4 font-semibold text-gray-800">
                  {appliedJob.job?.title}
                </TableCell>

                <TableCell className="py-4 text-gray-700">
                  {appliedJob.job?.company?.name}
                </TableCell>

                <TableCell className="py-4 text-right">
                  <Badge
                    className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-sm
    ${
      appliedJob?.status === "rejected"
        ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
        : appliedJob?.status === "pending"
          ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
          : "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
    }`}
                  >
                    {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
