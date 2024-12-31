import React from "react";
import { Paper, Box, Typography, Grid, IconButton } from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ReactFlowProvider, ReactFlow } from "react-flow-renderer";

const blockStyles = {
    p: 2,
    backgroundColor: "background.paper",
    color: "text.primary",
    borderRadius: 2,
    textAlign: "center",
    boxShadow: 2,
};

const initialNodes = [
    {
        id: "1",
        type: "input",
        data: { label: "Menu" },
        position: { x: 250, y: 5 },
    },
    {
        id: "2",
        data: { label: "Bug" },
        position: { x: 100, y: 150 },
    },
    {
        id: "3",
        data: { label: "Email" },
        position: { x: 400, y: 150 },
    },
];

const initialEdges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3", animated: true },
];

const Flow = () => {
    return (
        <Box sx={{ px: 4, py: 6 }}>
            <Grid container spacing={3}>
                {/* Left Panel */}
                <Grid item xs={3}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Blocks
                    </Typography>
                    <Paper sx={{ ...blockStyles, display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <TextFieldsIcon />
                        <Typography>Text</Typography>
                    </Paper>
                    <Paper sx={{ ...blockStyles, display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <ImageIcon />
                        <Typography>Image</Typography>
                    </Paper>
                    <Paper sx={{ ...blockStyles, display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <VideoLibraryIcon />
                        <Typography>Video</Typography>
                    </Paper>
                </Grid>

                {/* Flow Editor */}
                <Grid item xs={6}>
                    <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
                        Flow Editor
                    </Typography>
                    <Paper sx={{ height: 400, ...blockStyles }}>
                        <ReactFlowProvider>
                            <ReactFlow
                                nodes={initialNodes}
                                edges={initialEdges}
                                fitView
                                style={{ backgroundColor: "#222", height: "100%" }}
                            />
                        </ReactFlowProvider>
                    </Paper>
                </Grid>

                {/* Right Panel */}
                <Grid item xs={3}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Properties
                    </Typography>
                    <Paper
                        sx={{
                            ...blockStyles,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                        }}
                    >
                        <SettingsIcon />
                        <Typography>Settings</Typography>
                    </Paper>
                    <Paper
                        sx={{
                            ...blockStyles,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                        }}
                    >
                        <VisibilityIcon />
                        <Typography>Preview</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Flow;
