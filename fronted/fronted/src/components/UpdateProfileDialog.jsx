import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setloading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input,setInput] = useState({
    fullname:user?.fullname,
    email:user?.email,
    phoneNumber:user?.phoneNumber,
    bio:user?.profile?.bio,
    skills: user?.profile?.skills?.join(", ") || "",
    file:user?.profile?.resume
  });

  const dispatch= useDispatch();
  const changeEventHandler=(e) => {
    setInput({...input,[e.target.name]:e.target.value});
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
        formData.append("file", input.file);
    }

    try {
        setloading(true);

        const res = await axios.post(
            `${USER_API_END_POINT}/profile/update`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        if (res.data.success) {
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
            setOpen(false);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
        setloading(false);
    }
};
    

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({...input,file})
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[420px] bg-white rounded-lg p-5">
        <DialogHeader>
          <DialogTitle className="text-left text-base font-semibold">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-3 mt-2">
            <Label
              htmlFor="name"
              className="w-20 text-right font-medium text-black"
            >
              Name
            </Label>

            <Input
              id="name"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              className=" text-black flex-1 h-10 border border-gray-300 rounded-lg focus-visible:ring-1 focus-visible:ring-black"
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Label
              htmlFor="email"
              className="w-20 text-right font-medium text-black"
            >
              Email
            </Label>

            <Input
              id="email"
              name="email"
              value={input.email}
              type="email"
              onChange={changeEventHandler}
              className="text-black flex-1 h-10 border border-gray-300 rounded-lg focus-visible:ring-1 focus-visible:ring-black"
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Label
              htmlFor="number"
              className="w-20 text-right font-medium text-black"
            >
              Number
            </Label>

            <Input
              id="number"
              name="number"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className="text-black flex-1 h-10 border border-gray-300 rounded-lg focus-visible:ring-1 focus-visible:ring-black"
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Label
              htmlFor="bio"
              className="w-20 text-right font-medium text-black"
            >
              Bio
            </Label>

            <Input
              id="bio"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
              className="text-black flex-1 h-10 border border-gray-300 rounded-lg focus-visible:ring-1 focus-visible:ring-black"
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Label
              htmlFor="skills"
              className="w-20 text-right text-sm font-medium text-black"
            >
              Skills
            </Label>

            <Input
              id="skills"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              className="text-black flex-1 h-10 border border-gray-300 rounded-lg focus-visible:ring-1 focus-visible:ring-black"
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Label
              htmlFor="file"
              className="w-20 text-right text-sm font-medium text-black "
            >
              Resume
            </Label>

            <Input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"             
              onChange={fileChangeHandler}
              className="text-black flex-1 h-10 border border-gray-300 rounded-lg focus-visible:ring-1 focus-visible:ring-black"
            />
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 bg-purple-600 text-white text-base hover:bg-purple-700"
              >
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
