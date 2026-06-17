import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Box,
  FormControl,
  Select,
  Card,
  CardContent,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import { createStudent } from "../services/studentService";
import { SUBJECTS } from "../../../constants/subjects";

const CreateStudentPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    motherName: "",
    address: "",
    admissionDate: "",
    subject: "",
    totalFee: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First Name is required";
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo =
        "Mobile Number is required";
    }

    if (
      formData.mobileNo &&
      !/^\d{10}$/.test(
        formData.mobileNo
      )
    ) {
      newErrors.mobileNo =
        "Mobile Number must be exactly 10 digits";
    }

    if (!formData.admissionDate) {
      newErrors.admissionDate =
        "Admission Date is required";
    }

    if (!formData.subject) {
      newErrors.subject =
        "Subject is required";
    }

    if (!formData.totalFee) {
      newErrors.totalFee =
        "Total Fee is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length ===
      0
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      setLoading(true);

      await createStudent(formData);

      setSnackbar({
        open: true,
        message: "Student Registered Successfully",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/students");
      }, 1500);

    } catch (error) {

      console.error(error);
       setSnackbar({
    open: true,
    message:
      error?.response?.data?.message ||
      "Failed to create student",
    severity: "error",
  });


    } finally {

      setLoading(false);

    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: 1000,
        mx: "auto",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, #198bd2 0%, #1565c0 100%)",
          color: "white",
          boxShadow: "0 8px 24px rgba(65, 25, 210, 0.25)",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            mb: 0.5,
            letterSpacing: "-0.5px",
          }}
        >
          Student Registration
        </Typography>

        <Typography
          sx={{
            opacity: 0.9,
            fontSize: "1.4rem",
          }}
        >
          Register new students and manage admission details
        </Typography>
      </Paper>


      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        {/* Personal Information */}
        <Card
          sx={{
            mb: 3,
            borderRadius: 4,
            boxShadow: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 28,
                  bgcolor: "primary.main",
                  borderRadius: 1,
                  mr: 2,
                }}
              />

              <Typography
                variant="h5"
                fontWeight={700}
                color="text.primary"
              >
                Personal Information
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  First Name
                </Typography>

                <TextField
                  fullWidth
                  placeholder="Enter First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  Last Name
                </Typography>

                <TextField
                  fullWidth
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  Mobile Number
                </Typography>

                <TextField
                  fullWidth
                  placeholder="Enter Mobile Number"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={(e) => {

                    const value =
                      e.target.value.replace(
                        /\D/g,
                        ""
                      );

                    if (value.length <= 10) {
                      setFormData({
                        ...formData,
                        mobileNo: value,
                      });

                      setErrors({
                        ...errors,
                        mobileNo: "",
                      });
                    }
                  }}
                  error={!!errors.mobileNo}
                  helperText={errors.mobileNo}
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  Mother Name
                </Typography>

                <TextField
                  fullWidth
                  placeholder="Enter Mother Name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  Address
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Enter Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card
          sx={{
            mb: 3,
            borderRadius: 4,
            boxShadow: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 28,
                  bgcolor: "#10b981",
                  borderRadius: 1,
                  mr: 2,
                }}
              />

              <Typography
                variant="h5"
                fontWeight={700}
                color="text.primary"
              >
                Academic Information
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  Admission Date
                </Typography>

                <TextField
                  fullWidth
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  error={!!errors.admissionDate}
                  helperText={errors.admissionDate}

                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  Subject
                </Typography>

                <FormControl
                  fullWidth
                  error={!!errors.subject}
                >
                  <Select
                    displayEmpty
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#9e9e9e" }}>
                            Select Subject
                          </span>
                        );
                      }

                      return SUBJECTS.find(
                        (s) => s.value === selected
                      )?.label;
                    }}
                  >
                    {SUBJECTS.map((subject) => (
                      <MenuItem
                        key={subject.value}
                        value={subject.value}
                      >
                        {subject.label}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText>
                    {errors.subject}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>
                  Total Fee
                </Typography>

                <TextField
                  fullWidth
                  type="number"
                  placeholder="Enter Total Fee"
                  name="totalFee"
                  value={formData.totalFee}
                  onChange={handleChange}
                  error={!!errors.totalFee}
                  helperText={errors.totalFee}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              minWidth: 220,
              borderRadius: 3,
              px: 4,
              py: 1.5,
            }}
          >
            {loading
              ? "Creating..."
              : "Register Student"}
          </Button>
        </Box>
      </Box>
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
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreateStudentPage;