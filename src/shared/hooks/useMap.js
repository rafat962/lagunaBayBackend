/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import useAddWedgites from "./useAddWedgites";
import {
    detention_pond,
    dry_gully,
    Future_Development,
    open_area,
    Parcels,
    roads,
    NWC,
} from "../static/StaticMapData";
import useView from "./useView";

export const useMap = (basemap = "osm") => {
    const viewRef = useRef(null);
    let [mapViewModel, setView] = useState(null);
    let [mapModel, setmap] = useState(null);
    useEffect(() => {
        // --------------- View And Map ---------------
        // 2d view
        let { view, map } = useView(
            viewRef,
            basemap,
            Parcels
            // dry_gully,
            // Future_Development,
            // roads,
            // open_area,
            // detention_pond,
            // NWC
        );
        setView(view);
        setmap(map);
        // --------------- widgets ---------------
        useAddWedgites(view);
    }, [basemap]);
    return { viewRef, mapViewModel, mapModel };
};
