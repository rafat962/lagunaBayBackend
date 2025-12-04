import styled from "styled-components";
import AppLayout from "./shared/ui/AppLayout";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useGetDarkmode } from "./shared/hooks/useGetDarkmode";
import { useMemo } from "react";
import { NavContext } from "./shared/Context/MapContext";
const AppContainer = styled.div`
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
`;
const routs = createBrowserRouter([
    {
        path: "/backend",
        element: (
            <AppContainer>
                <AppLayout />
            </AppContainer>
        ),
        children: [{ path: "/backend", element: <Dashboard /> }],
    },
    {
        index: true,
        element: <Navigate to="/backend" replace />,
    },
]);

function App() {
    const { mode } = useGetDarkmode();
    let currentMode = "dark";
    mode === "dark" ? (currentMode = "dark") : (currentMode = "light");
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: currentMode,
                },
            }),
        [currentMode]
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavContext>
                <RouterProvider router={routs}></RouterProvider>
            </NavContext>
        </ThemeProvider>
    );
}

export default App;
