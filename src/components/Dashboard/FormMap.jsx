/* eslint-disable no-unused-vars */
import {
    Backdrop,
    Button,
    CircularProgress,
    MenuItem,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMapContext } from "../../shared/Context/MapContext";
import { Parcels } from "../../shared/static/StaticMapData";
import toast from "react-hot-toast";

const FormMap = () => {
    const { state } = useMapContext();
    const { data } = state;
    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data]);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            Formdata: 0,
            Lot_No: 0,
            Lot_Type: "",
            Size: "",
            Price_USD: "",
            Status: "",
        },
    });
    const [open, setOpen] = useState(false);
    function onSuccess(Formdata) {
        if (!Formdata) return;
        setOpen(true);
        const updatedFeature = {
            attributes: {
                OBJECTID: Formdata.OBJECTID, // must include unique ID!
                Lot_No: Formdata.Lot_No,
                Lot_Type: Formdata.Lot_Type,
                Size: Formdata.Size,
                Price_USD: Formdata.Price_USD,
                Status: Formdata.Status,
            },
        };
        console.log(updatedFeature);
        Parcels.applyEdits({
            updateFeatures: [updatedFeature],
        })
            .then((result) => {
                console.log(reset);
                toast.success("parcels Update Successfully");
                setOpen(false);
            })
            .catch((err) => {
                toast.error("Please Try Again Later");
                setOpen(false);
            });
    }
    return (
        <div className=" container w-full h-full space-y-4">
            {/* main container */}
            <div className="w-full border-b-2 border-b-gray-300 shadow-2xs flex items-center justify-center p-2">
                <p className="font-thr text-md tracking-wide font-bold">
                    Update Parcels Data
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSuccess)}
                className="flex flex-col items-center justify-center  px-2 space-y-2  w-full"
            >
                {/* Lot_No */}
                <div className="min-w-full ">
                    <Controller
                        key="Lot_No"
                        name="Lot_No"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value || ""} // Ensure value is never null
                                {...field}
                                className=" w-full text-right "
                                id="standard-basic"
                                type="number"
                                label="Lot_No"
                            />
                        )}
                    />
                </div>

                {/* Square Feet*/}
                <div className="min-w-full">
                    <Controller
                        key="Size"
                        name="Size"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value || ""} // Ensure value is never null
                                {...field}
                                className=" w-full text-right"
                                id="standard-basic"
                                type="text"
                                label="Size"
                            />
                        )}
                    />
                </div>
                {/* Price_USD*/}
                <div className="min-w-full">
                    <Controller
                        key="Price_USD"
                        name="Price_USD"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value || ""} // Ensure value is never null
                                {...field}
                                className=" w-full text-right"
                                id="standard-basic"
                                type="text"
                                label="Price_USD"
                            />
                        )}
                    />
                </div>
                {/* Lot_Type */}
                <div className="min-w-full">
                    <Controller
                        key="Lot_Type"
                        name="Lot_Type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="Lot_Type"
                            >
                                <MenuItem key="Residential" value="Residential">
                                    Residential
                                </MenuItem>
                                <MenuItem key="Commercial" value="Commercial">
                                    Commercial
                                </MenuItem>
                                <MenuItem
                                    key="Oversized Mixed Use"
                                    value="Oversized Mixed Use"
                                >
                                    Oversized Mixed Use
                                </MenuItem>
                            </TextField>
                        )}
                    />
                </div>
                {/* Status */}
                <div className="min-w-full ">
                    <Controller
                        key="Status"
                        name="Status"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="Status"
                            >
                                <MenuItem key="Available" value="Available">
                                    Available
                                </MenuItem>
                                <MenuItem key="sold" value="sold">
                                    sold
                                </MenuItem>
                                <MenuItem key="under offer" value="under offer">
                                    under offer
                                </MenuItem>
                                <MenuItem
                                    key="under contract"
                                    value="under contract"
                                >
                                    under contract
                                </MenuItem>
                            </TextField>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full" variant="contained">
                    <p className="text-lg">Update Data</p>
                </Button>
                <Backdrop
                    sx={(theme) => ({
                        color: "#fff",
                        zIndex: theme.zIndex.drawer + 1,
                    })}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </form>
        </div>
    );
};

export default FormMap;
