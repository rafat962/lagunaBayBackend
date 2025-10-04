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
import { Grid, Card, CardMedia, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Graphic from "@arcgis/core/Graphic";
const FormMap = () => {
    const { state } = useMapContext();
    const { data } = state;
    const handleFilesChange = (e, field) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        // دمج القديم مع الجديد
        const newFiles = [...(field.value || []), ...files];
        field.onChange(newFiles);

        // Create preview URLs
        const urls = newFiles.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
    };

    const handleRemove = (index, field, imageId) => {
        const newFiles = [...(field.value || [])];
        newFiles.splice(index, 1); // remove file
        field.onChange(newFiles);

        const newPreviews = [...previews];
        newPreviews.splice(index, 1); // remove preview
        setPreviews(newPreviews);
        if (imageId) {
            let feature = new Graphic({
                attributes: {
                    OBJECTID: data.OBJECTID,
                },
            });
            Parcels.deleteAttachments(feature, [imageId])
                .then((res) => {
                    toast.success("Deleted Successfully");
                })
                .catch((err) => {
                    toast.err(err.message);
                });
        }
    };
    async function getAttachment(id) {
        await Parcels.queryAttachments({
            where: `OBJECTID = ${id}`,
        }).then((result) => {
            let urls = [];
            Object.values(result).forEach((array) => {
                array.forEach((x) => {
                    urls.push({
                        id: x.id,
                        url: x.url,
                    });
                });
            });
            setPreviews(urls);
        });
    }

    useEffect(() => {
        if (data) {
            const sanitized = {
                ...data,
                SizeFT: data?.SizeFT ?? "",
                Size: data?.Size ?? "",
                Price_USD: data?.Price_USD ?? "",
                Lot_Type: data?.Lot_Type ?? "",
                Status: data?.Status ?? "",
                Parcel_View: data?.Parcel_View ?? "",
                Land_Terrain: data?.Land_Terrain ?? "",
                images: [],
            };
            getAttachment(data?.OBJECTID);
            reset(sanitized);
            setPreviews([]);
        }
    }, [data]);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            Formdata: 0,
            // Lot_No: 0,
            Lot_Type: "",
            Size: "",
            SizeFT: "",
            Price_USD: "",
            Status: "",
            Parcel_View: "",
            Land_Terrain: "",
            images: [],
        },
    });
    const [open, setOpen] = useState(false);
    const [previews, setPreviews] = useState([]);
    function onSuccess(Formdata) {
        if (!data || Object.keys(data).length === 0) return;
        if (!Formdata) return;
        setOpen(true);
        const updatedFeature = {
            attributes: {
                OBJECTID: Formdata.OBJECTID, // must include unique ID!
                // Lot_No: Formdata.Lot_No,
                Lot_Type: Formdata.Lot_Type,
                Size: Formdata.Size,
                Price_USD: Formdata.Price_USD,
                Status: Formdata.Status,
                SizeFT: Formdata.SizeFT,
                Parcel_View: Formdata.Parcel_View,
                Land_Terrain: Formdata.Land_Terrain,
            },
        };
        Parcels.applyEdits({
            updateFeatures: [updatedFeature],
        })
            .then(async (result) => {
                const objectId = result.updateFeatureResults[0].objectId;
                // attachment
                if (Formdata.images && Formdata.images.length > 0) {
                    for (const file of Formdata.images) {
                        const formData = new FormData();
                        formData.append("attachment", file);
                        let finalUrl = `${Parcels.url}/0/${Formdata.OBJECTID}/addAttachment`;
                        await fetch(finalUrl, {
                            method: "POST",
                            body: formData,
                        }).then((response) => {
                            console.log(response);
                            if (!response.ok) {
                                throw new Error(
                                    `Failed to upload attachment: ${response.statusText}`
                                );
                            }
                        });
                    }
                }
                toast.success("parcels Update Successfully");
                setOpen(false);
            })
            .catch((err) => {
                toast.error("Please Try Again Later");
                setOpen(false);
            });
    }
    return (
        <div className=" container w-full h-full space-y-4 overflow-auto">
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
                {/* <div className="min-w-full ">
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
                </div> */}
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
                                label="SIZE (SQ M)"
                            />
                        )}
                    />
                </div>
                {/* Square Feet*/}
                <div className="min-w-full">
                    <Controller
                        key="SizeFT"
                        name="SizeFT"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value || ""} // Ensure value is never null
                                {...field}
                                className=" w-full text-right"
                                id="standard-basic"
                                type="text"
                                label="Size (SQ FT)"
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
                                <MenuItem key="reserve" value="reserve">
                                    reserve
                                </MenuItem>
                            </TextField>
                        )}
                    />
                </div>
                {/* Parcel_View */}
                <div className="min-w-full ">
                    <Controller
                        key="Parcel_View"
                        name="Parcel_View"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="View"
                            >
                                <MenuItem key="Sea view" value="Sea view">
                                    Sea view
                                </MenuItem>
                                <MenuItem key="River view" value="River view">
                                    River view
                                </MenuItem>
                                <MenuItem
                                    key="Mountain view"
                                    value="Mountain view"
                                >
                                    Mountain view
                                </MenuItem>
                                <MenuItem key="City view" value="City view">
                                    City view
                                </MenuItem>
                            </TextField>
                        )}
                    />
                </div>
                {/* Land_Terrain */}
                <div className="min-w-full ">
                    <Controller
                        key="Land_Terrain"
                        name="Land_Terrain"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className="w-full text-right"
                                id="standard-basic"
                                select
                                label="Land Terrain"
                            >
                                <MenuItem key="Flat land" value="Flat land">
                                    Flat land
                                </MenuItem>
                                <MenuItem
                                    key="Slopes up at the back"
                                    value="Slopes up at the back"
                                >
                                    Slopes up at the back
                                </MenuItem>
                                <MenuItem
                                    key="Slopes down in the back"
                                    value="Slopes down in the back"
                                >
                                    Slopes down in the back
                                </MenuItem>
                                <MenuItem
                                    key="Slopes below road level"
                                    value="Slopes below road level"
                                >
                                    Slopes below road level
                                </MenuItem>
                            </TextField>
                        )}
                    />
                </div>
                {/* Images Upload with Preview + Remove */}
                <div className="min-w-full mb-6">
                    <Controller
                        key="images"
                        name="images"
                        control={control}
                        defaultValue={[]} // مهم
                        render={({ field }) => {
                            return (
                                <>
                                    <input
                                        accept="image/*"
                                        multiple
                                        type="file"
                                        id="images-upload"
                                        style={{ display: "none" }}
                                        onChange={(e) =>
                                            handleFilesChange(e, field)
                                        }
                                    />
                                    <label htmlFor="images-upload">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            fullWidth
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload Images
                                        </Button>
                                    </label>

                                    {/* Show Previews with Remove Button */}
                                    <Grid
                                        container
                                        spacing={1}
                                        className="mt-2"
                                    >
                                        {previews.length > 0 &&
                                            previews.map((src, index) => (
                                                <Grid
                                                    item
                                                    xs={6}
                                                    sm={4}
                                                    md={3}
                                                    key={index}
                                                >
                                                    <Card>
                                                        <CardMedia
                                                            component="img"
                                                            image={
                                                                src?.url || src
                                                            }
                                                            alt={`preview-${index}`}
                                                            style={{
                                                                objectFit:
                                                                    "cover",
                                                                height: "80px",
                                                                width: "120px",
                                                            }}
                                                        />
                                                        <CardActions>
                                                            <IconButton
                                                                color="error"
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        index,
                                                                        field,
                                                                        src?.id
                                                                    )
                                                                }
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            ))}
                                    </Grid>
                                </>
                            );
                        }}
                    />
                </div>

                {/* update data */}
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
