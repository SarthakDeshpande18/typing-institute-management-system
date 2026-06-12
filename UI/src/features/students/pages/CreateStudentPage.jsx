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
} from "@mui/material";

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
      !/^[6-9]\d{9}$/.test(
        formData.mobileNo
      )
    ) {
      newErrors.mobileNo =
        "Invalid Mobile Number";
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

      navigate("/students");

    } catch (error) {

      console.error(error);

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
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Create Student
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
      >
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
              onChange={handleChange}
              error={!!errors.mobileNo}
              helperText={errors.mobileNo}
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
              placeholder="Enter Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

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

          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                minWidth: 180,
              }}
            >
              {loading
                ? "Creating..."
                : "Create Student"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CreateStudentPage;