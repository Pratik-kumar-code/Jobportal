import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell className="text-black">
                {job.company?.name || "N/A"}
              </TableCell>

              <TableCell className="text-black">{job.title || "N/A"}</TableCell>

              <TableCell className="text-black">
                {job.createdAt ? job.createdAt.split("T")[0] : "N/A"}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
                    <MoreHorizontal className="h-5 w-5 text-black" />
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    side="bottom"
                    sideOffset={4}
                    className="w-36 rounded-md border border-gray-200 bg-white p-1 shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex h-8 w-full items-center gap-2 rounded-sm px-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                    >
                      <Edit2 className="h-4 w-4 shrink-0" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex h-8 w-full items-center gap-2 rounded-sm px-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                    >
                      <Eye className="h-4 w-4 shrink-0" />
                      <span>Applicants</span>
                    </button>
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

export default AdminJobsTable;
