import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Grid,
    CircularProgress,
    Divider,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import { getStudentById } from "../services/studentService";

const ViewStudentPage = () => {
    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const API_BASE_URL = "http://localhost:8080";

    const photoUrl = student?.photoUrl || "";

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
                            maxWidth: 450,
                            height: 500,
                            border: "3px solid #1976d2",
                            boxShadow: 3,
                        }}
                    >
                        {student?.firstName?.charAt(0)}
                    </Avatar>
                </Grid>

                {/* Details Section */}
                <Grid size={{ xs: 12, md: 9 }}>
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

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography color="text.secondary">
                                Subject
                            </Typography>
                            <Typography variant="h6">
                                {student.subject}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography color="text.secondary">
                                Total Fee
                            </Typography>
                            <Typography variant="h6">
                                ₹ {student.totalFee}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography color="text.secondary">
                                Paid Fee
                            </Typography>
                            <Typography variant="h6">
                                ₹ {student.paidFee}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography color="text.secondary">
                                Remaining Fee
                            </Typography>
                            <Typography variant="h6">
                                ₹ {student.remainingFee}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography color="text.secondary">
                                Address
                            </Typography>
                            <Typography variant="h6">
                                {student.address || "-"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ViewStudentPage;