import {
    useEffect,
    useState,
} from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { PAYMENT_MODES } from "../../../constants/paymentModes";
import {
    Paper,
    Typography,
    Grid,
    Box,
} from "@mui/material";

import {
    TextField,
    MenuItem,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";

import {
    useParams,
} from "react-router-dom";

import {
    getFeeSummary,
    payFee,
} from "../services/feeService";


const CollectFeePage = () => {

    const { studentId } = useParams();

    const [summary,
        setSummary] =
        useState(null);

    useEffect(() => {
        loadSummary();
    }, []);

    const [amountPaid, setAmountPaid] =
        useState("");

    const [paymentMode, setPaymentMode] =
        useState("");

    const [remarks, setRemarks] =
        useState("");

    const [snackbar, setSnackbar] =
        useState({
            open: false,
            message: "",
            severity: "success",
        });


    const loadSummary =
        async () => {

            try {

                const response =
                    await getFeeSummary(
                        studentId
                    );

                console.log(response.data.data);

                setSummary(response.data.data);

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    const handleCollectFee =
        async () => {
            console.log("Button Clicked");
            if (!amountPaid) {

                setSnackbar({
                    open: true,
                    message: "Amount is required",
                    severity: "error",
                });

                return;
            }

            if (
                Number(amountPaid) >
                Number(summary.remainingFee)
            ) {
                setSnackbar({
                    open: true,
                    severity: "error",
                    message:
                        "Amount cannot exceed remaining fee",
                });

                return;
            }

            if (!paymentMode) {

                setSnackbar({
                    open: true,
                    message: "Payment mode is required",
                    severity: "error",
                });

                return;
            }

            try {

                const payload = {
                    studentId:
                        Number(studentId),

                    amountPaid:
                        Number(amountPaid),

                    paymentMode,

                    remarks,
                };

                await payFee(payload);

                setSnackbar({
                    open: true,
                    message:
                        "Fee collected successfully",
                    severity: "success",
                });

                setAmountPaid("");
                setPaymentMode("");
                setRemarks("");

                loadSummary();

            } catch (error) {

                console.log("Fee Error:", error);

                console.log(
                    "Response:",
                    error.response
                );

                console.log(
                    "Response Data:",
                    error.response?.data
                );

                setSnackbar({
                    open: true,
                    message:
                        error.response?.data?.message ||
                        "Failed to collect fee",
                    severity: "error",
                });
            }
        };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 4,
            }}
        >
            {summary && (
                <>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        {summary.studentName}
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        {summary.regNo}
                    </Typography>

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                >
                                    Total Fee
                                </Typography>

                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                >
                                    ₹ {summary.totalFee}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                >
                                    Paid Fee
                                </Typography>

                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    color="success.main"
                                >
                                    ₹ {summary.paidFee}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                }}
                            >
                                <Typography
                                    color="text.secondary"
                                >
                                    Remaining Fee
                                </Typography>

                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    color="error.main"
                                >
                                    ₹ {summary.remainingFee}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Paper
                        elevation={2}
                        sx={{
                            mt: 4,
                            p: 3,
                            borderRadius: 3,
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            mb={3}
                        >
                            Collect Fee
                        </Typography>

                        <Grid container spacing={3}>

                            {/* Amount */}
                            <Grid size={{ xs: 12, md: 4 }}>

                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 600,
                                    }}
                                >
                                    Amount
                                </Typography>

                                <TextField
                                    fullWidth
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={amountPaid}
                                    onChange={(e) =>
                                        setAmountPaid(
                                            e.target.value
                                        )
                                    }
                                />

                            </Grid>

                            {/* Payment Mode */}
                            <Grid size={{ xs: 12, md: 4 }}>

                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 600,
                                    }}
                                >
                                    Payment Mode
                                </Typography>

                                <FormControl fullWidth>

                                    <Select
                                        displayEmpty
                                        value={paymentMode}
                                        onChange={(e) =>
                                            setPaymentMode(
                                                e.target.value
                                            )
                                        }
                                        renderValue={(selected) => {

                                            if (!selected) {

                                                return (
                                                    <span
                                                        style={{
                                                            color: "#9e9e9e",
                                                        }}
                                                    >
                                                        Select Payment Mode
                                                    </span>
                                                );
                                            }

                                            return PAYMENT_MODES.find(
                                                mode =>
                                                    mode.value === selected
                                            )?.label;
                                        }}
                                    >

                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                        {PAYMENT_MODES.map(
                                            (mode) => (
                                                <MenuItem
                                                    key={mode.value}
                                                    value={mode.value}
                                                >
                                                    {mode.label}
                                                </MenuItem>
                                            )
                                        )}

                                    </Select>

                                </FormControl>

                            </Grid>

                            {/* Empty Space */}
                            <Grid size={{ xs: 12, md: 4 }} />

                            {/* Remarks */}
                            <Grid size={{ xs: 12, md: 8 }}>

                                <Typography
                                    sx={{
                                        mb: 1,
                                        fontWeight: 600,
                                    }}
                                >
                                    Remarks
                                </Typography>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Enter Remarks"
                                    value={remarks}
                                    onChange={(e) =>
                                        setRemarks(
                                            e.target.value
                                        )
                                    }
                                />

                            </Grid>

                            {/* Button */}
                            <Grid size={{ xs: 12 }}>

                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleCollectFee}
                                        sx={{
                                            minWidth: 180,
                                            height: 50,
                                        }}
                                    >
                                        Collect Fee
                                    </Button>
                                </Box>

                            </Grid>

                        </Grid>
                    </Paper>
                </>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false,
                    })
                }
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

export default CollectFeePage;