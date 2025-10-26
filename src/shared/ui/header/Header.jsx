/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Langage from "./utils/Langage";
import Expand from "./utils/Expand";
import Dark from "./utils/Dark";
import Notification from "./utils/Notification";
import Search from "./utils/Search";
import Avatar from "@mui/material/Avatar";
import Project from "../../../components/Dashboard/utils/Project";
import { useMapContext } from "../../Context/MapContext";
import { HiOutlineShare, HiShare } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const { state } = useMapContext();
    const { view } = state;
    const [searchParams] = useSearchParams();
    const [project, setProject] = useState("NORWICH PORTLAND JAMAICA");
    useEffect(() => {
        const projectName = searchParams.get("project");
        const extent = searchParams.get("extent");
        if (projectName) {
            setProject(projectName);
        } else {
            setProject("NORWICH PORTLAND JAMAICA");
        }
        if (extent) {
            const extentArray = JSON.parse(extent);
            if (view) {
                console.log("view", view);
                view.when(() => {
                    view.goTo(
                        {
                            center: extentArray,
                            zoom: 18,
                        },
                        {
                            duration: 2000,
                            easing: "ease-in-out",
                        }
                    );
                });
            }
        }
    }, [searchParams, view]);
    const ShareMap = () => {
        const extent = searchParams.get("extent");
        const url = `https://realestatemerchants.netlify.app/MainMap?project=${project}&extent=${extent}`;
        // Copy URL to clipboard
        navigator.clipboard
            .writeText(url)
            .then(() => {
                toast.success("Frontend clipboard!", {
                    autoClose: 6000,
                });
            })
            .catch(() => {
                toast.error("❌ Failed to copy the link. Please try again.", {
                    position: "bottom-right",
                    autoClose: 6000,
                });
            });
    };
    const ShareMapBackend = () => {
        const extent = searchParams.get("extent");
        const url = `https://ecosteadbackend.netlify.app/dashboard?project=${project}&extent=${extent}`;
        // Copy URL to clipboard
        navigator.clipboard
            .writeText(url)
            .then(() => {
                toast.success("Backend clipboard!", {
                    autoClose: 6000,
                });
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
                    </div>
                    {/* SearchBar */}
                    {/* <Search /> */}
                </div>
                <div className="text-2xl tracking-wider font-semibold cursor-pointer font-thr">
                    {project}
                </div>
                {/* right */}
                <div className="flex items-center justify-center space-x-8">
                    <HiShare
                        onClick={ShareMapBackend}
                        className=" cursor-pointer text-2xl hover:text-blue-500 trans"
                    />
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
