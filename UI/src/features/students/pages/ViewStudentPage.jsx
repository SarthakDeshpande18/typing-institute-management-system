import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Grid,
    CircularProgress,
    Divider,
    Chip,
    Card,
    CardContent,
    Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import { getStudentById } from "../services/studentService";
import { Button } from "@mui/material";

const ViewStudentPage = () => {
    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const API_BASE_URL = "http://localhost:8080";

    const photoUrl = student?.photoUrl || "";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        try {
            const response = await getStudentById(id);

            setStudent(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    console.log(student.photoUrl);

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 4,
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                fontWeight="bold"
            >
                Student Details
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={4}>
                {/* Photo Section */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <Avatar
                        src={photoUrl}
                        alt={student?.firstName}
                        variant="rounded"
                        sx={{
                            width: "100%",
                            maxWidth: 350,
                            height: 500,
                            border: "3px solid #d2191900",
                            boxShadow: 3,
                        }}
                    >
                        {student?.firstName?.charAt(0)}
                    </Avatar>
                </Grid>

                {/* Details Section */}
                <Grid size={{ xs: 12, md: 9 }}>
                    <Box mb={4}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >
                            {student.firstName} {student.lastName}
                        </Typography>

                        <Box sx={{ mt: 1 }}>
                            <Typography
                                component="span"
                                color="text.main"
                                sx={{
                                    fontSize: "1.4rem",
                                }}
                            >
                                Registration No :
                            </Typography>

                            <Typography
                                component="span"
                                sx={{
                                    ml: 1,
                                    fontSize: "1.3rem",
                                    fontWeight: 600,
                                    color: "text.main",
                                    letterSpacing: 1,
                                }}
                            >
                                {student.regNo}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mt: 2,
                                flexWrap: "wrap",
                            }}
                        >
                            <Chip
                                label="Active"
                                color="success"
                            />

                            <Chip
                                label={student.subject}
                                color="primary"
                                variant="outlined"
                            />

                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() =>
                                    navigate(`/fees/${student.id}`)
                                }
                            >
                                Collect Fee
                            </Button>
                        </Box>

                        <Grid
                            container
                            spacing={2}
                            sx={{ mt: 2, mb: 4 }}
                        >
                            <Grid size={{ xs: 12, md: 3 }}>
                                <Card elevation={2}>
                                    <CardContent>
                                        <Typography color="text.secondary">
                                            Total Fee
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                        >
                                            ₹ {student.totalFee}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <Card elevation={2}>
                                    <CardContent>
                                        <Typography color="text.secondary">
                                            Paid Fee
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                            color="success.main"
                                        >
                                            ₹ {student.paidFee}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <Card elevation={2}>
                                    <CardContent>
                                        <Typography color="text.secondary">
                                            Remaining Fee
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                            color="error.main"
                                        >
                                            ₹ {student.remainingFee}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ mb: 2 }}
                    >
                        Student Information
                    </Typography>

                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography color="text.secondary">
                                Registration Number
                            </Typography>
                            <Typography variant="h6">
                                {student.regNo}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography color="text.secondary">
                                Admission Date
                            </Typography>
                            <Typography variant="h6">
                                {student.admissionDate}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography color="text.secondary">
                                First Name
                            </Typography>
                            <Typography variant="h6">
                                {student.firstName}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography color="text.secondary">
                                Last Name
                            </Typography>
                            <Typography variant="h6">
                                {student.lastName}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography color="text.secondary">
                                Mobile Number
                            </Typography>
                            <Typography variant="h6">
                                {student.mobileNo}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography color="text.secondary">
                                Mother Name
                            </Typography>
                            <Typography variant="h6">
                                {student.motherName || "-"}
                            </Typography>
                        </Grid>



                        <Grid size={{ xs: 12 }}>
                            <Card elevation={1}>
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >
                                        Address
                                    </Typography>

                                    <Typography>
                                        {student.address || "-"}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ViewStudentPage;