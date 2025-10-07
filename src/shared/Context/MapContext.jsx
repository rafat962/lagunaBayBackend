// MapContext.js
import { createContext, useContext, useReducer } from "react";

const MapBarContext = createContext();

const initValue = {
    view: "",
    data: {},
    project: "NORWICH PORTLAND JAMAICA",
    extent: [-76.475188, 18.191876],
};

function reducer(state, action) {
    switch (action.type) {
        case "view":
            return {
                ...initValue,
                view: action.payload,
            };
        case "data":
            return {
                ...state,
                data: action.payload,
            };
        case "project":
            return {
                ...state,
                project: action.payload.name,
                extent: action.payload.extent,
            };
        default:
            return state;
    }
}

const NavContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initValue);
    return (
        <MapBarContext.Provider value={{ state, dispatch }}>
            {children}
        </MapBarContext.Provider>
    );
};

function useMapContext() {
    const context = useContext(MapBarContext);
    if (context === undefined)
        throw new Error("useMap must be used within a MapContextProvider");
    return context;
}

export { NavContext, useMapContext };
