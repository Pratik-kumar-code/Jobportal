import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
const navigate = useNavigate();
const [companyName,setCompanyName]=useState();
const dispatch=useDispatch();

const registereNewCompany = async () => {
  // if (!companyName.trim()) {
  //   return toast.error("Company name is required");
  // }

  try {
    const res = await axios.post(
      `${COMPANY_API_END_POINT}/register`,
      { companyName },{
        headers:{
          'Content-Type':'application/json'
        },
      
       withCredentials: true 
  });

    // console.log("API Response:", res.data);

    if (res?.data?.success) {
      dispatch(setSingleCompany(res.data.company));
      toast.success(res.data.message);

      const companyId = res?.data?.company?._id;

      // if (companyId) {
      //   navigate(`/admin/companies/${companyId}`);
      // } else {
      //   navigate("/admin/companies");
      // }
      navigate(`/admin/companies/${companyId}`);
    }
  } catch (error) {
    console.log("Registration error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to create company");
  }
};



return ( <div className="min-h-screen bg-gray-50"> <Navbar />


  <div className="max-w-4xl mx-auto px-4 py-10">
    <Button
      variant="outline"
      onClick={() => navigate("/admin/companies")}
      className="mb-6 flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>

    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100">
          <Building2 className="h-6 w-6 text-purple-700" />
        </div>

        <div>
          <h1 className="font-bold text-2xl text-gray-900">
            Your Company Name
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add your company details to get started.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Label
          htmlFor="companyName"
          className="text-sm font-semibold text-gray-700"
        >
          Company Name
        </Label>

        <Input
          id="companyName"
          type="text"
          className="h-11 rounded-lg border-gray-300 focus-visible:ring-purple-500"
          placeholder="JobHunt, Microsoft, etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <p className="text-xs text-gray-500">
          Choose a name that represents your company. You can update it
          later.
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-gray-100">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/companies")}
        >
          Cancel
        </Button>

        <Button onClick={registereNewCompany} className="bg-purple-700 hover:bg-purple-800 text-white">
          Continue
        </Button>
      </div>
    </div>
  </div>
</div>


);
};

export default CompanyCreate;
