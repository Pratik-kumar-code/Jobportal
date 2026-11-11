import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { User2, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

export const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed. Please try again.");
    }
  };
  return (
    <div className="bg-white">
      {" "}
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {" "}
        <div>
          {" "}
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>{" "}
          </h1>{" "}
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 text-black">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-black border-gray-400 hover:bg-purple-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-400 text-white hover:bg-purple-500">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile"
                  />
                  <AvatarFallback>
                    {user?.fullname?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                side="bottom"
                sideOffset={8}
                className="w-64 rounded-md border bg-white p-3 shadow-md"
              >
                {/* User Information */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile"
                    />
                    <AvatarFallback>
                      {user?.fullname?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <h4 className="truncate font-medium text-black">
                      {user?.fullname}
                    </h4>
                    <p className="truncate text-xs text-black">
                      {user?.profile?.bio || "No bio added"}
                    </p>
                  </div>
                </div>

                {/* Menu Options */}
                <div className="mt-3 flex flex-col gap-1">
                  {user && user.role == "student" && (
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/profile")}
                      className="h-9 w-full justify-start gap-3 px-2 font-bold text-black"
                    >
                      <User2 className="h-5 w-5" />
                      View Profile
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={logoutHandler}
                    className="h-9 w-full justify-start gap-3 px-2 font-bold text-black "
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
