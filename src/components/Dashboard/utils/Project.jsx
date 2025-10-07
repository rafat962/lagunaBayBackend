import { MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMapContext } from "../../../shared/Context/MapContext";
import { getExtent } from "../helpers/getProjectExtent";

const Project = () => {
    const { dispatch } = useMapContext();
    const { control, watch } = useForm();
    const watchProject = watch("Project");
    const { state } = useMapContext();
    const { view } = state;
    useEffect(() => {
        console.log(view);
        let extent;
        if (view) {
            extent = getExtent(watchProject);
            if (!extent) return;
            view?.goTo(
                {
                    center: extent,
                    zoom: 18,
                },
                {
                    duration: 2000, // animation duration in milliseconds (2 seconds)
                    easing: "ease-in-out", // smooth acceleration and deceleration
                }
            );
        }
        dispatch({
            type: "project",
            payload: {
                name: watchProject,
                extent: extent,
            },
        });
    }, [watchProject]);
    return (
        <div className="w-30 h-fit">
            {/* Project */}
            <div className="min-w-full">
                <Controller
                    key="Project"
                    name="Project"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="w-full text-right"
                            id="standard-basic"
                            select
                            label="Project"
                            variant="standard"
                        >
                            <MenuItem
                                key="NORWICH PORTLAND JAMAICA"
                                value="NORWICH PORTLAND JAMAICA"
                            >
                                NORWICH PORTLAND JAMAICA
                            </MenuItem>
                            <MenuItem key="Villanova" value="Villanova">
                                Villanova
                            </MenuItem>
                        </TextField>
                    )}
                />
            </div>
        </div>
    );
};

export default Project;
