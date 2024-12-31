import { AppBar, Box, Button, Switch, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { saveForm } from "../Components/auth/auth.service";
import { FormContext } from "../App";
import { toast, ToastContainer } from "react-toastify";

export const Navbar = (props) => {
    const [darkMode, setDarkMode] = useState(true);
    const { folderId, id } = useParams();
    const { folders, setFolders } = useContext(FormContext);
    const [anchorEl, setAnchorEl] = useState(null);  // for the dropdown menu
    const [openMenu, setOpenMenu] = useState(false);  // for controlling dropdown visibility

    let user = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
        props.setDarkMode && props.setDarkMode(darkMode);
    };

    const handleOpenSharePopup = () => {
        props.setOpenModal && props.setOpenModal(true);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        navigate("/auth/login");
        toast.success("Logged out successfully", { position: "top-right" });
    };

    const handleSave = () => {
        const folderToSave = cleanReactInternalProps(folders);

        let reqBody = folderToSave.find((el) => String(el.folderId) === String(folderId));
        reqBody = {
            ...reqBody,
            userId: user.user._id
        };

        console.log(folderToSave, "folder");
        saveForm(reqBody)
            .then((res) => {
                console.log(res, "response");
                toast.success(res.message, { position: "top-right" });
                navigate("/analytics");
            })
            .catch((err) => toast.error("Error While Submitting", { position: "top-right" }));
    };

    useEffect(() => {
        if (!user) {
            navigate("/auth/login"); // Redirect to login if no user is logged in
        }
    }, [navigate]);

    return (
        <Box
            sx={{
                backgroundColor: darkMode ? "#121212" : "#f4f4f4",
                color: darkMode ? "#fff" : "#000",
                minHeight: "100vh",
            }}
        >
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={handleMenuOpen}
                            sx={{ marginLeft: 2 }}
                        >
                        {user?.user?.username}'s Workspace
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                    </Typography>
                    <Typography variant="body2" sx={{ marginRight: 1 }}>
                        Light
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                    <Typography variant="body2" sx={{ marginLeft: 1 }}>
                        Dark
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginLeft: 2 }}
                        onClick={handleOpenSharePopup}
                    >
                        Share
                    </Button>
                    {folderId && id && (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginLeft: 2 }}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Box>{props.children}</Box>
            <ToastContainer />
        </Box>
    );
};

function cleanReactInternalProps(obj) {
    if (Array.isArray(obj)) {
        return obj.map(cleanReactInternalProps);
    }
    if (typeof obj === "object" && obj !== null) {
        const cleanedObj = {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (
                    key !== "stateNode" &&
                    key !== "_owner" &&
                    key !== "_store" &&
                    key !== "updateQueue" &&
                    key !== "memoizedProps"
                ) {
                    cleanedObj[key] = cleanReactInternalProps(obj[key]);
                }
            }
        }

        return cleanedObj;
    }
    return obj;
}
