import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (event) => {
    event?.preventDefault();
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          N0. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-black">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum beatae
          impedit facere at explicabo.
        </p>
        <form
          onSubmit={searchJobHandler}
          className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto"
        >
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="text-black putline-none border-none w-full"
          />
          <Button
            type="submit"
            className="bg-[#6A38C2] rounded-r-full text-white hover:bg-gray-800"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
