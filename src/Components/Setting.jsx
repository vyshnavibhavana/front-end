import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Typography,
    Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updateUserSettings } from "../Components/auth/auth.service"; // You can implement this API call
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        oldPassword: "",
        newPassword: "",
    });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const user = JSON.parse(sessionStorage.getItem("user"));
    useEffect(() => {
        if (!user) {
            navigate("/auth/login");
        }
        // Pre-fill form fields with current user data if available
        setUserData({
            name: user?.user?.username || "",
            email: user?.user?.email || "",
        });
    }, [navigate, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePasswordVisibility = (field) => {
        if (field === "oldPassword") {
            setShowOldPassword(!showOldPassword);
        } else {
            setShowNewPassword(!showNewPassword);
        }
    };

    const handleSubmit = () => {
        setLoading(true);

        // API call to update user settings
        const updatedUser = {
            name: userData.name,
            email: userData.email,
            oldPassword: userData.oldPassword,
            newPassword: userData.newPassword,
            userId: user.user._id,
        };

        updateUserSettings(updatedUser)
            .then((res) => {
                toast.success("Settings updated successfully!", {
                    position: "top-right",
                });
                navigate("/dashboard"); // Redirect after successful update
            })
            .catch((err) => {
                toast.error("Error updating settings", {
                    position: "top-right",
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box
                sx={{
                    backgroundColor: "#121212",
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
                    Settings
                </Typography>
                <TextField
                    placeholder="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    sx={{
                        mb: 2, "& .MuiInputLabel-root": { color: "#fff" }, // Label color
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#fff" }, // Border color
                            "&:hover fieldset": { borderColor: "#2979FF" }, // Hover border color
                            "&.Mui-focused fieldset": { borderColor: "#2979FF" }, // Focused border color
                            "& input": { color: "#fff" }, // Input text color
                            "& input::placeholder": { color: "#fff", opacity: 1 },
                        }
                    }}
                    InputProps={{
                        style: { color: "#fff" },
                    }}
                />
                <TextField
                    placeholder="Update Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    sx={{
                        mb: 2, "& .MuiInputLabel-root": { color: "#fff" }, // Label color
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#fff" }, // Border color
                            "&:hover fieldset": { borderColor: "#2979FF" }, // Hover border color
                            "&.Mui-focused fieldset": { borderColor: "#2979FF" }, // Focused border color
                            "& input": { color: "#fff" }, // Input text color
                            "& input::placeholder": { color: "#fff", opacity: 1 },
                        }
                    }}
                    InputProps={{
                        style: { color: "#fff" },
                    }}
                />
                <TextField
                    placeholder="Old Password"
                    variant="outlined"
                    fullWidth
                    name="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={userData.oldPassword}
                    onChange={handleChange}
                    sx={{
                        mb: 2, "& .MuiInputLabel-root": { color: "#fff" }, // Label color
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#fff" }, // Border color
                            "&:hover fieldset": { borderColor: "#2979FF" }, // Hover border color
                            "&.Mui-focused fieldset": { borderColor: "#2979FF" }, // Focused border color
                            "& input": { color: "#fff" }, // Input text color
                            "& input::placeholder": { color: "#fff", opacity: 1 },
                        }
                    }}
                    InputProps={{
                        style: { color: "#fff" },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => handlePasswordVisibility("oldPassword")}
                                >
                                    {showOldPassword ? (
                                        <VisibilityOff sx={{ color: "#fff" }} />
                                    ) : (
                                        <Visibility sx={{ color: "#fff" }} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    placeholder="New Password"
                    variant="outlined"
                    fullWidth
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={userData.newPassword}
                    onChange={handleChange}
                    sx={{
                        mb: 2, "& .MuiInputLabel-root": { color: "#fff" }, // Label color
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#fff" }, // Border color
                            "&:hover fieldset": { borderColor: "#2979FF" }, // Hover border color
                            "&.Mui-focused fieldset": { borderColor: "#2979FF" }, // Focused border color
                            "& input": { color: "#fff" }, // Input text color
                            "& input::placeholder": { color: "#fff", opacity: 1 },
                        }
                    }}
                    InputProps={{
                        style: { color: "#fff" },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => handlePasswordVisibility("newPassword")}
                                >
                                    {showNewPassword ? (
                                        <VisibilityOff sx={{ color: "#fff" }} />
                                    ) : (
                                        <Visibility sx={{ color: "#fff" }} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                        mt: 2,
                        backgroundColor: "#1e88e5",
                        "&:hover": {
                            backgroundColor: "#1565c0",
                        },
                    }}
                >
                    {loading ? "Updating..." : "Update"}
                </Button>
            </Box>
        </Container>
    );
};

export default SettingsPage;
