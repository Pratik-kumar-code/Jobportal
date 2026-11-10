import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
    const navigate=useNavigate();
    useGetAllCompanies();
    const [input,setInput]=useState("");
    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(setSearchCompanyByText(input));
    },[input]);

return ( 
<div className="min-h-screen bg-gray-50">
     <Navbar />
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Companies
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        Manage your registered companies and their information.
      </p>
    </div>

    {/* Search and Add Company */}
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

        <Input
          type="text"
          placeholder="Filter by company name..."
          onChange={(e) => setInput(e.target.value)}
          className="pl-9 h-11 bg-white border-gray-200 rounded-lg focus-visible:ring-purple-500"
        />
      </div>

      <Button onClick={()=> navigate("/admin/companies/create")} className="h-11 px-5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg">
        <Plus className="h-4 w-4 mr-2" />
        New Company
      </Button>
    </div>

    {/* Companies Table */}
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <CompaniesTable />
    </div>
  </div>
</div>


);
};

export default Companies;
