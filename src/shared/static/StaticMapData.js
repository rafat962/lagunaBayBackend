import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import esriConfig from "@arcgis/core/config.js";
esriConfig.apiKey = JSON.parse(localStorage.getItem("LayerToken"));
const Parcels = new FeatureLayer({
    portalItem: {
        id: "b6ba1c62635742bf86b9589fee86c9d5", // Your portal item ID
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
const dry_gully = new FeatureLayer({
    portalItem: {
        id: "b6ba1c62635742bf86b9589fee86c9d5", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const NWC = new FeatureLayer({
    portalItem: {
        id: "a483d02b1bf54d2f8ab5417b38380d74", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const detention_pond = new FeatureLayer({
    portalItem: {
        id: "62d0d45469c64daea047e77401f18321", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const Future_Development = new FeatureLayer({
    portalItem: {
        id: "05eeb7b0ec734343850119d69d9cfa79", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const roads = new FeatureLayer({
    portalItem: {
        id: "d523a118f7964ed7bbdabc012fbcdfff", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const open_area = new FeatureLayer({
    portalItem: {
        id: "f0edf81c8fb848ecaa22bad009d14cba", // Your portal item ID
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
