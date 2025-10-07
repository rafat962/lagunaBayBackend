import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const Parcels = new FeatureLayer({
    portalItem: {
        id: "0e77a171e98c409a929e435b13269b2e", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
    title: "Parcels",
    labelingInfo: [
        {
            labelExpressionInfo: { expression: "$feature.Lot_NUM" }, // غيّر NAME للفيلد بتاعك
            symbol: {
                type: "text",
                color: "black",
                haloSize: 1,
                haloColor: "white",
                font: {
                    size: 10,
                    family: "Arial",
                },
            },
            // أهم حاجة هنا 👇
            labelPlacement: "always-horizontal",
            deconflictionStrategy: "none", // ده يخليها تظهر كلها حتى لو متزاحمة
        },
    ],
    labelsVisible: true,
});
// const Parcels = new FeatureLayer({
//     portalItem: {
//         id: "08e5d450059d4bc8b223e187c500991e", // Your portal item ID
//     },
//     outFields: ["*"], // Ensure all fields are available
// });
const dry_gully = new FeatureLayer({
    portalItem: {
        id: "1ad5c87bdf954de2a6fef701fb8eed6e", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const NWC = new FeatureLayer({
    portalItem: {
        id: "16d24dcfc5af4c12a056004a52e50e2b", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const detention_pond = new FeatureLayer({
    portalItem: {
        id: "43857943807e4b61a898df7f53e6c3e6", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const Future_Development = new FeatureLayer({
    portalItem: {
        id: "dc04b442cbd844c1aa2d6d72cfd5339d", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const roads = new FeatureLayer({
    portalItem: {
        id: "a4ddef94c886474392a20ed39569c796", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const open_area = new FeatureLayer({
    portalItem: {
        id: "4dc5206e1dad4a9f9851b57da3cb5090", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});

const center = [-76.475188, 18.191876];
const zoom = 18;

export {
    center,
    zoom,
    Parcels,
    dry_gully,
    Future_Development,
    detention_pond,
    roads,
    open_area,
    NWC,
};
