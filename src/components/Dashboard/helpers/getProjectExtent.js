const projects = [
    {
        name: "EcoStead @ Norwich",
        extent: [-76.475188, 18.191876],
    },
    {
        name: "VILLANOVA MEWS",
        extent: [-76.9741388, 17.9904303],
    },
    {
        name: "DRAX HALL",
        extent: [-77.1887546, 18.4227611],
    },
];

function getExtent(name) {
    if (!name) return;
    return projects.filter((item) => item.name == name)[0].extent;
}

export { getExtent, projects };
