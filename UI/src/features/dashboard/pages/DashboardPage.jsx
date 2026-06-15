import {
    Grid,
    Typography,
    CircularProgress,
    Box,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import DashboardCard from "../components/DashboardCard";

import { getDashboard } from "../services/dashboardService";

const DashboardPage = () => {

    const [dashboard,
        setDashboard] =
        useState(null);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard =
        async () => {

            try {

                const response = await getDashboard();

                setDashboard(response.data.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

    if (loading) {
        return (
            <CircularProgress />
        );
    }

    return (
        <>
            <Box
                sx={{
                    mb: 5,
                    p: 3,
                    borderRadius: 3,
                    background:
                        "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    color: "white",
                    boxShadow: 3,
                }}
            >
                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    Dashboard
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        mt: 1,
                        opacity: 0.9,
                    }}
                >
                    Welcome to Typing Institute Management System
                </Typography>
            </Box>
            <Grid
                container
                spacing={4}
            >
                <Grid size={{ xs: 12, md: 3 }}>
                    <DashboardCard
                        title="Total Students"
                        value={
                            dashboard.totalStudents
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <DashboardCard
                        title="Active Students"
                        value={
                            dashboard.activeStudents
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <DashboardCard
                        title="Inactive Students"
                        value={
                            dashboard.inactiveStudents
                        }
                    />
                </Grid>

                {/* <Grid size={{ xs: 12, md: 3 }}>
                    <DashboardCard
                        title="Fully Paid Students"
                        value={
                            dashboard.fullyPaidStudents
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <DashboardCard
                        title="Fees Collected"
                        value={`₹ ${dashboard.totalFeesCollected}`}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <DashboardCard
                        title="Pending Fees"
                        value={`₹ ${dashboard.pendingFees}`}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <DashboardCard
                        title="Students With Pending Fees"
                        value={
                            dashboard.studentsWithPendingFees
                        }
                    />
                </Grid> */}
            </Grid>
        </>
    );
};

export default DashboardPage;