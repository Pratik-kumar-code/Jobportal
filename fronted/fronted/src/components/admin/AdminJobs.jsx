import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BriefcaseBusiness className="h-6 w-6 text-[#6A38C2]" />
              <h1 className="text-2xl font-bold text-gray-900">
                Manage Companies
              </h1>
            </div>

            <p className="text-sm text-gray-500">
              View, search and manage all your registered companies.
            </p>
          </div>

          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="h-11 px-5 bg-[#6A38C2] hover:bg-[#5726ad] text-white rounded-lg shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Jobs
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Search Section */}
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Company Directory
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Search and manage your registered companies.
                </p>
              </div>

              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <Input
                  type="text"
                  placeholder="Search company,role..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="pl-9 h-10 bg-gray-50 border-gray-200 rounded-lg text-black focus-visible:ring-[#6A38C2]"
                />
              </div>
            </div>
          </div>

          {/* Companies Table */}
          <div className="overflow-x-auto">
            <AdminJobsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
