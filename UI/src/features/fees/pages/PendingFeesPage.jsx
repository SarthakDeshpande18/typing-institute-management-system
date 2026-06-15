import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";

import {
    useEffect,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { getPendingFees }
    from "../services/feeService";

const PendingFeesPage = () => {

    const navigate = useNavigate();

    const [loading,
        setLoading] =
        useState(true);

    const [students, setStudents] = useState([]);

    const [filters,
        setFilters] =
        useState({
            studentName: "",
            regNo: "",
        });

    useEffect(() => {
        loadPendingFees();
    }, []);

    const loadPendingFees =
        async () => {

            try {

                const response =
                    await getPendingFees(
                        0,
                        50,
                        filters
                    );

                setStudents(response.data.data.results || []);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

    const handleSearch =
        () => {

            loadPendingFees();
        };

    const handleReset =
        () => {

            setFilters({
                studentName: "",
                regNo: "",
            });

            loadPendingFees();
        };

    if (loading) {
        return (
            <CircularProgress />
        );
    }

    return (
        <>
            <Box sx={{ mb: 4 }}>

                <Button
                    startIcon={
                        <ArrowBackIcon
                            sx={{
                                fontSize: 28,
                            }}
                        />
                    }
                    onClick={() => navigate("/dashboard")}
                    sx={{
                        mb: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "1.50rem",
                        px: 2.5,
                        py: 1,
                    }}
                >
                    Back to Dashboard
                </Button>

                <Box
                    sx={{
                        borderLeft: "4px solid #1976d2",
                        pl: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Pending Fees
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                    >
                        View and manage students with outstanding fee balances
                    </Typography>
                </Box>

            </Box>

            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 4,
                }}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Student Name"
                            value={
                                filters.studentName
                            }
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    studentName:
                                        e.target.value,
                                })
                            }
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Registration No"
                            value={
                                filters.regNo
                            }
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    regNo:
                                        e.target.value,
                                })
                            }
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={
                                    handleSearch
                                }
                            >
                                Search
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={
                                    handleReset
                                }
                            >
                                Reset
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Paper
                sx={{
                    p: 2,
                    borderRadius: 3,
                }}
            >
                <TableContainer>
                    <Table>

                        <TableHead
                            sx={{
                                backgroundColor: "#faf8f5",
                            }}
                        >

                            <TableRow>

                                <TableCell>
                                    <strong>Sr No</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>Reg No</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>Student Name</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>Total Fee</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>Paid Fee</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>Remaining Fee</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>Action</strong>
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {students?.length > 0 ? (

                                students.map(
                                    (
                                        student,
                                        index
                                    ) => (

                                        <TableRow
                                            key={
                                                student.studentId
                                            }
                                        >

                                            <TableCell>
                                                {
                                                    index + 1
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    student.regNo
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    student.studentName
                                                }
                                            </TableCell>

                                            <TableCell>
                                                ₹ {
                                                    student.totalFee
                                                }
                                            </TableCell>

                                            <TableCell>
                                                ₹ {
                                                    student.paidFee
                                                }
                                            </TableCell>

                                            <TableCell>
                                                <Typography
                                                    color="error"
                                                    fontWeight="bold"
                                                >
                                                    ₹ {student.remainingFee}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>

                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() =>
                                                        navigate(
                                                            `/fees/${student.studentId}`
                                                        )
                                                    }
                                                >
                                                    Collect Fee
                                                </Button>

                                            </TableCell>

                                        </TableRow>
                                    )
                                )

                            ) : (

                                <TableRow>

                                    <TableCell
                                        colSpan={7}
                                        align="center"
                                    >
                                        No Pending Fees Found
                                    </TableCell>

                                </TableRow>

                            )}

                        </TableBody>

                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default PendingFeesPage;