import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi-NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42k-1lakh", "1lakh-5lakh"],
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">Filter Jobs</h1>

                <button
                    onClick={() => setSelectedValue("")}
                    className="text-sm text-purple-600 hover:underline"
                >
                    Clear
                </button>
            </div>

            <hr className="my-4 border-gray-300" />

            {filterData.map((data, index) => (
                <div key={data.filterType} className="mb-5">
                    <h1 className="text-lg font-bold mb-3">
                        {data.filterType}
                    </h1>

                    <RadioGroup
                        value={selectedValue}
                        onValueChange={setSelectedValue}
                    >
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;

                            return (
                                <div
                                    key={item}
                                    className="flex items-center gap-2 mb-2"
                                >
                                    <RadioGroupItem
                                        value={item}
                                        id={itemId}
                                    />

                                    <Label
                                        htmlFor={itemId}
                                        className="text-sm cursor-pointer"
                                    >
                                        {item}
                                    </Label>
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;