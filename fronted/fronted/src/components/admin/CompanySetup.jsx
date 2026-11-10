import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);                      
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const {singleCompany}=useSelector(store=>store.company);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              type="button"
              variant="outline"
              className="h-10 px-4 flex items-center gap-2 rounded-lg border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Company Setup
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Update your company information and profile.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Company Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter company name"
                  className=" text-black h-11 rounded-lg border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Description
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter company description"
                  className=" text-black h-11 rounded-lg border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Website
                </Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://example.com"
                  className=" text-black h-11 rounded-lg border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Location
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="Enter company location"
                  className=" text-black h-11 rounded-lg border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Company Logo
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="h-12 rounded-lg border-gray-300 file:mr-4 file:border-0 file:bg-purple-50 file:px-4 file:py-2 file:rounded-md file:text-sm file:font-medium file:text-white-700"
                />
                <p className="text-xs text-gray-500">
                  Upload an image for your company profile.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-2 pt-6 border-t border-gray-100">
              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-lg bg-black px-1 text-white hover:bg-gray-800 hover:text-white m-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;
