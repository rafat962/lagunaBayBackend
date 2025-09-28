/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Langage from "./utils/Langage";
import Expand from "./utils/Expand";
import Dark from "./utils/Dark";
import Notification from "./utils/Notification";
import Search from "./utils/Search";
import Avatar from "@mui/material/Avatar";
const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    return (
        <div className="p-3 w-full h-full border-b-[1px] border-b-gray-400  trans">
            <div className="flex h-full items-center justify-between">
                {/* left */}
                <div className="flex h-full items-center justify-start   space-x-4">
                    {/* Lan */}
                    {/* <Langage /> */}
                    {/* Expand */}
                    <Expand />
                    <div className="flex items-center justify-center ">
                        {/* Dark */}
                        {/* <Dark darkMode={darkMode} setDarkMode={setDarkMode} /> */}
                        {/* Notification */}
                        {/* <Notification /> */}
                    </div>
                    {/* SearchBar */}
                    {/* <Search /> */}
                </div>
                <div className="text-2xl tracking-wider font-semibold cursor-pointer font-thr">
                    NORWICH PORTLAND JAMAICA
                </div>
                {/* right */}
                <div className="flex">
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
                </div>
            </div>
        </div>
    );
};

export default Header;
