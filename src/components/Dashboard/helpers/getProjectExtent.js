const projects = [
    {
        name: "EcoStead @ Norwich",
        extent: [-76.475188, 18.191876],
    },
    {
        name: "VILLANOVA MEWS",
        extent: [-76.9741388, 17.9904303],
    },
];

function getExtent(name) {
    if (!name) return;
    return projects.filter((item) => item.name == name)[0].extent;
}

export { getExtent };
