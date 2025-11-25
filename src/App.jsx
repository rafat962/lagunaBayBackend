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
import { useMemo, useState, useEffect } from "react";
import { NavContext } from "./shared/Context/MapContext";
import getToken from "./shared/helpers/GetToken";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";

const AppContainer = styled.div`
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
`;

// Developer Alert Component
const DeveloperAlert = () => {
    const [open, setOpen] = useState(true);
    const [showMiniAlert, setShowMiniAlert] = useState(false);

    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
        setTimeout(() => setShowMiniAlert(true), 1000);
    };

    const handleMiniAlertClick = () => {
        setOpen(true);
        setShowMiniAlert(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                disableEscapeKeyDown
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: 2,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    },
                }}
            >
                <DialogContent
                    sx={{
                        padding: 3,
                        textAlign: "center",
                        bgcolor: "background.paper",
                        position: "relative",
                    }}
                >
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            opacity: 0.5,
                            "&:hover": { opacity: 0.8 },
                        }}
                        onClick={() => setShowMiniAlert(true)}
                    >
                        <CloseIcon />
                    </IconButton>

                    <WarningIcon
                        sx={{ fontSize: 60, color: "warning.main", mb: 2 }}
                    />

                    <Typography
                        variant="h4"
                        gutterBottom
                        color="primary.main"
                        fontWeight="bold"
                    >
                        Important Notice to Clients
                    </Typography>

                    <Typography variant="h6" gutterBottom color="text.primary">
                        Original Website Developer: Rafat Kamel
                    </Typography>

                    <Typography
                        variant="body1"
                        paragraph
                        sx={{ mt: 2, lineHeight: 1.6 }}
                    >
                        The client <strong>Dennis Peace</strong>{" "}
                        (dennispeace834@gmail.com) committed fraud by not paying
                        after work completion and blocked communication.
                        <strong className="text-red-600 text-xl">
                            Olarinoye Mubarak Is a Thief
                        </strong>
                    </Typography>
                    <Typography
                        variant="body1"
                        paragraph
                        sx={{ lineHeight: 1.6 }}
                    >
                        Unfortunately, your data security was compromised due to
                        the client's negligence in securing it despite my
                        repeated warnings. I maintain a copy of the data on my
                        personal device and am committed to preserving its
                        confidentiality.
                    </Typography>

                    <Typography
                        variant="body1"
                        paragraph
                        sx={{ lineHeight: 1.6, fontWeight: "bold" }}
                    >
                        You can contact me directly to handle your data and
                        website:
                    </Typography>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            marginTop: 16,
                        }}
                    >
                        <PersonIcon color="primary" />
                        <Typography variant="body1" fontWeight="bold">
                            Rafat Kamel
                        </Typography>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            marginTop: 8,
                        }}
                    >
                        <EmailIcon color="primary" />
                        <Typography variant="body1">
                            rafatkamel5@gmail.com
                        </Typography>
                    </div>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            (window.location.href =
                                "mailto:rafatkamel5@gmail.com")
                        }
                        startIcon={<EmailIcon />}
                        sx={{ borderRadius: 2, px: 4 }}
                    >
                        Contact via Email
                    </Button>
                </DialogActions>
            </Dialog>

            {showMiniAlert && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-50%)",
                        background: "linear-gradient(135deg, #ff6b6b, #ff8e53)",
                        color: "white",
                        padding: "12px 16px",
                        borderRadius: "8px 0 0 8px",
                        cursor: "pointer",
                        boxShadow: "-2px 0 10px rgba(0,0,0,0.3)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                    }}
                    onClick={handleMiniAlertClick}
                    onMouseEnter={(e) => {
                        e.target.style.background =
                            "linear-gradient(135deg, #ff5252, #ff6b35)";
                        e.target.style.paddingRight = "20px";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background =
                            "linear-gradient(135deg, #ff6b6b, #ff8e53)";
                        e.target.style.paddingRight = "16px";
                    }}
                >
                    <WarningIcon sx={{ fontSize: 24, color: "white", mr: 1 }} />
                    <span>Important Notice - Click Here</span>
                </div>
            )}
        </>
    );
};

const routs = createBrowserRouter([
    {
        path: "/dashboard",
        element: (
            <AppContainer>
                <AppLayout />
            </AppContainer>
        ),
        children: [{ path: "/dashboard", element: <Dashboard /> }],
    },
    {
        index: true,
        element: <Navigate to="/dashboard" replace />,
    },
]);

function App() {
    useEffect(() => {
        getToken();

        // Console warning
        console.log(
            `%c
        ⚠️  IMPORTANT CLIENT NOTICE ⚠️
        Original Developer: Rafat Kamel
        Email: rafatkamel5@gmail.com
        For direct communication regarding website and data
        `,
            "color: red; font-size: 16px; font-weight: bold;"
        );

        // Tab title alert
        let originalTitle = document.title;
        let alertShown = false;

        const flashTitle = () => {
            document.title = alertShown
                ? originalTitle
                : "⚠️ IMPORTANT NOTICE - " + originalTitle;
            alertShown = !alertShown;
        };

        const titleInterval = setInterval(flashTitle, 1000);

        return () => {
            clearInterval(titleInterval);
            document.title = originalTitle;
        };
    }, []);

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
            <DeveloperAlert />
            <NavContext>
                <RouterProvider router={routs}></RouterProvider>
            </NavContext>
        </ThemeProvider>
    );
}

export default App;
