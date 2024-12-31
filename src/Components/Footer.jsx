import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#121212",
                color: "#FFFFFF",
                py: 4,
                px: 2,
            }}
        >
            <Grid container spacing={4} justifyContent="center">
                {/* Branding */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                        FormBot
                    </Typography>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", justifyContent:'center', color: "text.secondary" }}>
                        Made with <FavoriteIcon fontSize="small" sx={{ mx: 0.5, color: "red" }} /> by{" "}
                        <Link href="https://cuvette.tech" underline="hover" target="_blank" rel="noopener" sx={{ ml: 0.5 }}>
                            @cuvette
                        </Link>
                    </Typography>
                </Grid>

                {/* Product Links */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                        Product
                    </Typography>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            Status
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            Documentation
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            Roadmap
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            Pricing
                        </Link>
                    </Box>
                </Grid>

                {/* Community Links */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                        Community
                    </Typography>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            Discord
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            GitHub repository
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            Twitter
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            LinkedIn
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            OSS Friends
                        </Link>
                    </Box>
                </Grid>

                {/* Company Links */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                        Company
                    </Typography>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            About
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            Contact
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            Terms of Service
                        </Link>
                    </Box>
                    <Box>
                        <Link href="#" underline="hover" color="text.secondary">
                            Privacy Policy
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
