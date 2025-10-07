import React, { memo, useEffect } from "react";
import { useMap } from "../../../shared/hooks/useMap";
import { useMapContext } from "../../../shared/Context/MapContext";
const Map = () => {
    const { viewRef, mapViewModel } = useMap();
    const { dispatch } = useMapContext();

    useEffect(() => {
        if (!mapViewModel) return; // wait until ready
        dispatch({
            type: "view",
            payload: mapViewModel,
        });
        const handleClick = (event) => {
            mapViewModel.hitTest(event).then((res) => {
                if (res.results.length) {
                    console.log("HitTest results:", res);
                    const pointData = res.results[0].graphic.attributes;
                    dispatch({
                        type: "data",
                        payload: pointData,
                    });
                } else {
                    console.log("No graphic found");
                }
            });
        };

        const handle = mapViewModel.on("click", handleClick);

        return () => handle.remove(); // cleanup
    }, [mapViewModel, dispatch]);

    return <div ref={viewRef} className="w-full h-full"></div>;
};

export default memo(Map);
