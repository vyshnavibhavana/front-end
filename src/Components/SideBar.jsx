import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Typography, Paper, IconButton } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import GifIcon from "@mui/icons-material/Gif";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DateRangeIcon from "@mui/icons-material/DateRange";
import StarIcon from "@mui/icons-material/Star";
import NumbersIcon from "@mui/icons-material/Numbers";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormContext } from "../App";
import { useParams } from "react-router-dom";

const Sidebar = () => {
    const { id, folderId } = useParams();
    const {folders, setFolders} = useContext(FormContext);
    const handleSelect = (item) => {
        const updatedFolders = folders.map((folder) => {
            if (String(folder.folderId) === String(folderId)) {
                return {
                    ...folder,
                    form: folder.form.map((form) => {
                        if (String(form.id) === String(id)) {
                            return {
                                ...form,
                                formData: [...(form.formData || []), item],
                            };
                        }
                        return form;
                    }),
                };
            }
            return folder;
        });
        setFolders(updatedFolders);
    };

    const handleChange = (e, fieldIndex) => {
        const updatedFolders = folders.map((folder) => {
            if (String(folder.folderId) === String(folderId)) {
                return {
                    ...folder,
                    form: folder.form.map((form) => {
                        if (String(form.id) === String(id)) {
                            const updatedFormData = form.formData.map((field, index) => {
                                if (index === fieldIndex) {
                                    return {
                                        ...field,
                                        value: e.target.value,
                                    };
                                }
                                return field;
                            });
                            return {
                                ...form,
                                formData: updatedFormData,
                            };
                        }
                        return form;
                    }),
                };
            }
            return folder;
        });
        setFolders(updatedFolders);
    };

    const handleDelete = (indexToDelete) => {
        const updatedFolders = folders.map((folder) => {
            if (String(folder.folderId) === String(folderId)) {
                return {
                    ...folder,
                    form: folder.form.map((form) => {
                        if (String(form.id) === String(id)) {
                            return {
                                ...form,
                                formData: form.formData.filter(
                                    (_, index) => index !== indexToDelete
                                ),
                            };
                        }
                        return form;
                    }),
                };
            }
            return folder;
        });
        setFolders(updatedFolders);
    };
    const sections = [
        {
            title: "Bubbles",
            items: [
                { label: "Text", type: "text", icon: <TextFieldsIcon /> },
                { label: "Image", type: "image", icon: <ImageIcon /> },
                { label: "Video", type: "video", icon: <VideoLibraryIcon /> },
                { label: "GIF", type: "gif", icon: <GifIcon /> },
            ],
        },
        {
            title: "Inputs",
            items: [
                { label: "Text", type: "text", icon: <TextFieldsIcon /> },
                { label: "Number", type: "number", icon: <NumbersIcon /> },
                { label: "Email", type: "email", icon: <EmailIcon /> },
                { label: "Phone", type: "phone", icon: <PhoneIcon /> },
                { label: "Date", type: "date", icon: <DateRangeIcon /> },
                { label: "Rating", type: "rating", icon: <StarIcon /> },
                { label: "Button", type: "button", icon: <AddCircleOutlineIcon /> },
            ],
        },
    ];

    const renderPreview = () => {
        const folder = folders?.find((el) => String(el.folderId) === String(folderId));
        const form = folder?.form?.find((el) => String(el.id) === String(id));
        const formData = form?.formData || [];
        if (formData.length === 0) {
            return (
                <Typography variant="h6" sx={{ color: "#999" }}>
                    Select a field to preview details.
                </Typography>
            );
        }

        return (
            <>
                {formData.map((field, index) => (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{
                            padding: 2,
                            backgroundColor: "#18181B",
                            color: "#fff",
                            marginTop: 2,
                            width: "100%",
                        }}
                    >
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h5" sx={{ marginBottom: 1 }}>
                                {field.label}
                            </Typography>
                            <IconButton
                                sx={{
                                    color: "white",
                                }}
                                onClick={() => handleDelete(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <input
                            type={field.type}
                            placeholder={`Enter Your ${field.label}`}
                            value={field.value || ""}
                            onChange={(e) => handleChange(e, index)}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "8px",
                                backgroundColor: "#252525",
                                color: "#fff",
                                border: "1px solid #3e3e3e",
                                borderRadius: "4px",
                            }}
                        />
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            Hint: This is where you can add further details or a preview.
                        </Typography>
                    </Paper>
                ))}
            </>
        );
    };


    return (
        <Box
            sx={{
                display: "flex",
                // height: "100vh",
                backgroundColor: "#18181B",
                color: "#fff",
            }}
        >
            {/* Sidebar */}
            <Box
                sx={{
                    width: "300px",
                    backgroundColor: "#18181B",
                    padding: 2,
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                }}
            >
                {sections.map((section, index) => (
                    <Box key={index}>
                        <Typography
                            variant="h6"
                            sx={{
                                marginBottom: 1,
                                fontWeight: "bold",
                                color: "orange",
                            }}
                        >
                            {section.title}
                        </Typography>
                        <Grid container spacing={1}>
                            {section.items.map((item) => (
                                <Grid item xs={6} key={item.type}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#252525",
                                            color: "#fff",
                                            textTransform: "none",
                                            ":hover": { backgroundColor: "#3e3e3e" },
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 1,
                                            height: 40,
                                        }}
                                        onClick={() => handleSelect(item)}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Box>

            {/* Main Content Area */}
            <Box
                sx={{
                    flex: 1,
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                {renderPreview()}
            </Box>
        </Box>
    );
};

export default Sidebar;
