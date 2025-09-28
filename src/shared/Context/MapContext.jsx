// MapContext.js
import { createContext, useContext, useReducer } from "react";

const MapBarContext = createContext();

const initValue = {
    view: "",
    data: {},
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
                ...initValue,
                data: action.payload,
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
