import { NavContext } from "../../shared/Context/MapContext";
import FormMap from "./utils/FormMap";
import Map from "./utils/Map";
const Dashboard = () => {
    return (
        <div className="w-full h-full  p-2">
            {/* main container */}
            <div className="flex items-center space-x-2 p-2 justify-center w-full h-full  bg-white rounded-xl shadow-2xl drop-shadow-2xl ring-1 ring-gray-200">
                {/* map */}
                <div className="overflow-hidden w-[75%] h-full rounded-l-2xl ring-2 ring-gray-200">
                    <Map />
                </div>
                {/* form */}
                <div className="w-[25%] h-full ring-2 ring-gray-200 shadow-2xl dr rounded-r-2xl">
                    <FormMap />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
