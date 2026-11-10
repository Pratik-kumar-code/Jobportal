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
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";   
import { useNavigate } from "react-router-dom";


const CompaniesTable = () => {
  const { companies,searchCompanyByText} = useSelector((store) => store.company);
  const [filterCompany,setFilterCompany]=useState(companies);
  const navigate=useNavigate();
  
  useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
               };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <>
            {filterCompany?.map((company) => (
              <tr>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo}
                      alt="Company logo"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="text-black">{company.name}</TableCell>
                <TableCell className="text-black">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  {" "}
                  <Popover>
                    {" "}
                    <PopoverTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100">
                      {" "}
                      <MoreHorizontal className="h-5 w-5 text-black" />{" "}
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      side="bottom"
                      sideOffset={4}
                      className="w-20 rounded-md border border-gray-200 bg-white p-1 shadow-md"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex h-8 w-full items-center gap-1 rounded-sm px-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        <Edit2 className="h-4 w-4 shrink-0" />
                        <span>Edit</span>
                      </button>
                    </PopoverContent>
                  </Popover>{" "}
                </TableCell>
              </tr>
            ))}
          </>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
