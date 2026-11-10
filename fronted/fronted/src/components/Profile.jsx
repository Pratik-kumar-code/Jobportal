import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pen } from "lucide-react";
import { Contact, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

//const skills = ["HTML", "CSS", "JAVASCRIPT", "REACTJS"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://static.vecteezy.com/system/resources/previews/028/339/965/original/microsoft-icon-logo-symbol-free-png.png"
                alt="profile"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl mb-1">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="text-right text-black"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-black">
            <Mail></Mail>
            <span>{user?.email}</span>
          </div>
          <div className="text-black flex items-center gap-3 my-2">
            <Contact></Contact>
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-lg font-bold mb-3">Skills</h1>

          <div className="flex flex-wrap gap-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full font-medium border-none"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-2 mt-4">
          <Label className="text-lg font-bold">Resume</Label>

          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              {user.profile.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span className="text-sm text-gray-500">NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
