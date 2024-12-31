import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, ThemeProvider, createTheme } from "@mui/material";
import bgImage from '../assets/images/Container.jpg';
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#121212",
            paper: "#1E1E1E",
        },
        primary: {
            main: "#6C63FF",
        },
        secondary: {
            main: "#FF6584",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#A0A0A0",
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        h4: {
            fontWeight: 700,
            fontSize: "2rem",
        },
        subtitle1: {
            fontSize: "1.2rem",
        },
        button: {
            textTransform: "none",
        },
    },
});

function LandingPage() {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", color: "text.primary" }}>
                {/* Header */}
                <AppBar position="static" color="transparent" elevation={0}>
                    <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                        <Typography variant="h6" sx={{  fontWeight:600 }}>
                            FormBot
                        </Typography>
                        <Box sx={{display:'flex', justifyContent:'end'}}>
                        <Button color="primary" variant="outlined" sx={{ mr: 2 }} onClick={()=>navigate('auth/login')}>
                            Sign in
                        </Button>
                        <Button color="primary" variant="contained">
                            Create a FormBot
                        </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Header Text */}
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="h4">Build advanced chatbots visually</Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1, color: "text.secondary" }}>
                        Typebot gives you powerful blocks to create unique chat experiences. Embed them anywhere on your web/mobile
                        apps and start collecting results like magic.
                    </Typography>
                    <Button color="primary" variant="contained" size="large" sx={{ mt: 3 }}>
                        Create a FormBot for free
                    </Button>
                </Box>

                {/* Flow Component */}
                {/* <Flow /> */}
                <Box sx={{padding:'50px'}}>
                <img src={bgImage} alt="" width={'100%'}/>
                </Box>
            </Box>
            <Footer/>
        </ThemeProvider>
    );
}

export default LandingPage;
