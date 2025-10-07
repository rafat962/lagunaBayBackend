/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Langage from "./utils/Langage";
import Expand from "./utils/Expand";
import Dark from "./utils/Dark";
import Notification from "./utils/Notification";
import Search from "./utils/Search";
import Avatar from "@mui/material/Avatar";
import Project from "../../../components/Dashboard/utils/Project";
import { useMapContext } from "../../Context/MapContext";
import { HiOutlineShare } from "react-icons/hi2";
import toast from "react-hot-toast";
const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const { state } = useMapContext();
    const { project, extent } = state;
    const ShareMap = () => {
        const Sextent = JSON.stringify(extent);
        const url = `https://lagunabay.netlify.app/MainMap?project=${project}&extent=${Sextent}`;

        // Copy URL to clipboard
        navigator.clipboard
            .writeText(url)
            .then(() => {
                toast.success(
                    "Map link copied to clipboard! You can now share it with others.",
                    {
                        autoClose: 6000,
                    }
                );
            })
            .catch(() => {
                toast.error("❌ Failed to copy the link. Please try again.", {
                    position: "bottom-right",
                    autoClose: 6000,
                });
            });
    };

    return (
        <div className="p-3 w-full h-full border-b-[1px] border-b-gray-400  trans">
            <div className="flex h-full items-center justify-between">
                {/* left */}
                <div className="flex h-full items-center justify-start   space-x-4">
                    {/* Lan */}
                    {/* <Langage /> */}
                    {/* Expand */}
                    <Expand />
                    <div className="flex items-center justify-center w-full ">
                        <Project />
                        {/* Dark */}
                        {/* <Dark darkMode={darkMode} setDarkMode={setDarkMode} /> */}
                        {/* Notification */}
                        {/* <Notification /> */}
                        {/* copy */}
                    </div>
                    {/* SearchBar */}
                    {/* <Search /> */}
                </div>
                <div className="text-2xl tracking-wider font-semibold cursor-pointer font-thr">
                    {project}
                </div>
                {/* right */}
                <div className="">
                    <HiOutlineShare
                        onClick={ShareMap}
                        className=" cursor-pointer text-2xl hover:text-blue-500 trans"
                    />
                </div>
                {/* <div className="flex">
                    {darkMode && (
                        <Avatar
                            variant="rounded"
                            className="cursor-pointer active:scale-110 trans"
                            src="/logo.png"
                            sx={{
                                width: 80,
                                height: 80,
                            }}
                        ></Avatar>
                    )}
                    {!darkMode && (
                        <Avatar
                            variant="rounded"
                            className="cursor-pointer active:scale-110 trans"
                            src="/logo.png"
                            sx={{
                                width: 80,
                                height: 80,
                            }}
                        ></Avatar>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default Header;
