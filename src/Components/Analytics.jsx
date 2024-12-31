import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { getAnalytics } from "./auth/auth.service";
import { toast } from "react-toastify";

const AnalyticsPage = () => {
    const [analyticsData, setAnalyticsData] = useState({});
    const [loading, setLoading] = useState(true);

    // Retrieving user from session storage
    let user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        const fetchAnalytics = async () => {
            await getAnalytics(user.user._id)
                .then((response) => {
                    setAnalyticsData(response);
                })
                .catch((error) => {
                    console.error("Error while fetching analytics:", error);
                    toast.error("Error While Getting Analytics", { position: "top-right" });
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchAnalytics();
    }, []); // Empty dependency array ensures the effect runs only once

    // Destructure stats and submissions
    const { stats, submissions } = analyticsData;

    // Pie chart data
    const pieData = {
        labels: ["Completed", "Incomplete"],
        datasets: [
            {
                data: [stats?.completed, stats?.starts - stats?.completed],
                backgroundColor: ["#4caf50", "#f44336"],
                hoverBackgroundColor: ["#66bb6a", "#e57373"],
            },
        ],
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {loading && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            )}
            {/* Display message if analyticsData is not loaded */}
            {!loading && !analyticsData && <Typography variant="h6">No data available</Typography>}

            {/* Statistics Section */}
            {stats && (
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                            <Typography variant="h6">Views</Typography>
                            <Typography variant="h4">{stats?.views}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                            <Typography variant="h6">Starts</Typography>
                            <Typography variant="h4">{stats?.starts}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                            <Typography variant="h6">Completion Rate</Typography>
                            <Typography variant="h4">{stats?.completionRate}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* Pie Chart Section */}
            {stats && (
                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Typography variant="h6">Completion Rate</Typography>
                    <Pie data={pieData} />
                </Box>
            )}

            {/* Submissions Table */}
            {submissions && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Submissions</Typography>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Submitted At</strong></TableCell>
                                    {/* Dynamically rendering table headers */}
                                    {Object.keys(submissions[0] || {}).map((key, index) =>
                                        key !== "submittedAt" ? (
                                            <TableCell key={index}><strong>{key}</strong></TableCell>
                                        ) : null
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {submissions?.map((submission, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{submission.submittedAt}</TableCell>
                                        {/* Dynamically rendering submission data */}
                                        {Object.keys(submission).map((key, index) =>
                                            key !== "submittedAt" ? <TableCell key={index}>{submission[key]}</TableCell> : null
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Container>
    );
};

export default AnalyticsPage;
