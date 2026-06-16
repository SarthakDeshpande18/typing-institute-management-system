import { useEffect, useState } from "react";

import StudentDocumentsTable
    from "../components/StudentDocumentsTable";

import {
    getStudentDocuments,
    deleteStudentDocument,
    getStudentById,
} from "../services/studentService";

import {
    Paper,
    Typography,
    Grid,
    CircularProgress,
    Divider,
    Chip,
    Card,
    CardContent,
    Snackbar,
    Alert,
    Box,
    Avatar,
    Button,
    Stack,
} from "@mui/material";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import PaymentsIcon from "@mui/icons-material/Payments";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import SchoolIcon from "@mui/icons-material/School";

import { useNavigate, useParams } from "react-router-dom";

const ViewStudentPage = () => {
    const { id } = useParams();

    const [student, setStudent] = useState(null);
    // const API_BASE_URL = "http://localhost:8080";
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const photoUrl = student?.photoUrl || "";
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [selectedDocumentId, setSelectedDocumentId] =
        useState(null);
    const [loading, setLoading] = useState(true);
    const handleOpenDeleteDialog = (
        documentId
    ) => {

        setSelectedDocumentId(documentId);

        setDeleteDialogOpen(true);
    };
    const [documents, setDocuments] =
        useState([]);

    useEffect(() => {
        loadStudent();
        loadDocuments();
    }, []);

    const loadDocuments = async () => {

        try {

            const response =
                await getStudentDocuments(id);

            console.log(
                "DOCUMENT RESPONSE",
                response
            );

            setDocuments(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };
    const handleConfirmDelete =
        async () => {

            try {

                await deleteStudentDocument(
                    selectedDocumentId
                );

                loadDocuments();

                setSnackbar({
                    open: true,
                    message:
                        "Document deleted successfully",
                    severity: "success",
                });

            } catch (error) {

                setSnackbar({
                    open: true,
                    message:
                        "Failed to delete document",
                    severity: "error",
                });
            } finally {

                setDeleteDialogOpen(false);

                setSelectedDocumentId(null);
            }
        };
    const handleDeleteDocument =
        async (documentId) => {

            const confirmed =
                window.confirm(
                    "Delete this document?"
                );

            if (!confirmed) {
                return;
            }

            try {

                await deleteStudentDocument(
                    documentId
                );

                loadDocuments();

            } catch (error) {

                console.error(error);

            }
        };

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

            <>
                {/* Student Profile Card */}
                <Card
                    sx={{
                        borderRadius: 4,
                        mb: 4,
                        boxShadow: 3,
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Grid container spacing={4}>
                            {/* Avatar */}
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <Avatar
                                        src={photoUrl}
                                        alt={student?.firstName}
                                        sx={{
                                            width: 320,
                                            height: 320,
                                            fontSize: 72,
                                            bgcolor: "primary.main",
                                            boxShadow: 4,
                                        }}
                                    >
                                        {student?.firstName?.charAt(0)}
                                    </Avatar>
                                </Box>
                            </Grid>

                            {/* Student Details */}
                            <Grid size={{ xs: 12, md: 8 }}>
                                <Box
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        fontWeight={700}
                                    >
                                        {student.firstName} {student.lastName}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 1,
                                            fontSize: "1.2rem",
                                            color: "text.secondary",
                                        }}
                                    >
                                        Registration No :
                                        <strong>
                                            {" "}
                                            {student.regNo}
                                        </strong>
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        sx={{ mt: 3 }}
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
                                            sx={{
                                                borderRadius: 2,
                                                textTransform: "none",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Collect Fee
                                        </Button>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Fee Summary Cards */}
                <Grid
                    container
                    spacing={3}
                    sx={{ mb: 4 }}
                >
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                borderLeft:
                                    "5px solid #1976d2",
                                height: "100%",
                            }}
                        >
                            <CardContent>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Typography color="text.secondary">
                                            Total Fee
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            fontWeight={700}
                                        >
                                            ₹{" "}
                                            {student.totalFee?.toLocaleString()}
                                        </Typography>
                                    </Box>

                                    <AccountBalanceWalletIcon
                                        color="primary"
                                        fontSize="large"
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                borderLeft:
                                    "5px solid #2e7d32",
                                height: "100%",
                            }}
                        >
                            <CardContent>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Typography color="text.secondary">
                                            Paid Fee
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            fontWeight={700}
                                            color="success.main"
                                        >
                                            ₹{" "}
                                            {student.paidFee?.toLocaleString()}
                                        </Typography>
                                    </Box>

                                    <PaymentsIcon
                                        color="success"
                                        fontSize="large"
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                borderLeft:
                                    "5px solid #ed6c02",
                                height: "100%",
                            }}
                        >
                            <CardContent>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Typography color="text.secondary">
                                            Pending Fee
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            fontWeight={700}
                                            color="warning.main"
                                        >
                                            ₹{" "}
                                            {student.remainingFee?.toLocaleString()}
                                        </Typography>
                                    </Box>

                                    <WarningAmberIcon
                                        color="warning"
                                        fontSize="large"
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Student Information */}
                <Card
                    sx={{
                        borderRadius: 4,
                        boxShadow: 2,
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            gutterBottom
                        >
                            Student Information
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Registration Number
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    {student.regNo}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Admission Date
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    {student.admissionDate}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Subject
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    {student.subject}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    First Name
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    {student.firstName}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Last Name
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    {student.lastName}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Mobile Number
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    {student.mobileNo}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Mother Name
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    {student.motherName || "-"}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Address
                                </Typography>

                                <Typography
                                    fontWeight={600}
                                >
                                    {student.address || "-"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </>

            <StudentDocumentsTable
                documents={documents}
                onDelete={handleOpenDeleteDialog}
            />

            <Dialog
                open={deleteDialogOpen}
                onClose={() =>
                    setDeleteDialogOpen(false)
                }
            >
                <DialogTitle>
                    Delete Document
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to
                        delete this document?

                        <br />
                        <br />

                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() =>
                            setDeleteDialogOpen(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={
                            handleConfirmDelete
                        }
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false,
                    })
                }
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={() =>
                        setSnackbar({
                            ...snackbar,
                            open: false,
                        })
                    }
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Paper>
    );


};

export default ViewStudentPage;