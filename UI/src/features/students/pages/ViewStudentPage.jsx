import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material";

import { useParams } from "react-router-dom";

import { getStudentById } from "../services/studentService";

const ViewStudentPage = () => {
  const { id } = useParams();

  const [student, setStudent] = useState(null);

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

  return (
      <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
          >
              Student Details
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>

              <Grid item xs={12} md={6}>
                  <Typography color="text.secondary">
                      Registration Number
                  </Typography>
                  <Typography variant="h6">
                      {student.regNo}
                  </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                  <Typography color="text.secondary">
                      Admission Date
                  </Typography>
                  <Typography variant="h6">
                      {student.admissionDate}
                  </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                  <Typography color="text.secondary">
                      First Name
                  </Typography>
                  <Typography variant="h6">
                      {student.firstName}
                  </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                  <Typography color="text.secondary">
                      Last Name
                  </Typography>
                  <Typography variant="h6">
                      {student.lastName}
                  </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                  <Typography color="text.secondary">
                      Mobile Number
                  </Typography>
                  <Typography variant="h6">
                      {student.mobileNo}
                  </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                  <Typography color="text.secondary">
                      Mother Name
                  </Typography>
                  <Typography variant="h6">
                      {student.motherName || "-"}
                  </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                  <Typography color="text.secondary">
                      Subject
                  </Typography>
                  <Typography variant="h6">
                      {student.subject}
                  </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                  <Typography color="text.secondary">
                      Total Fee
                  </Typography>
                  <Typography variant="h6">
                      ₹ {student.totalFee}
                  </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                  <Typography color="text.secondary">
                      Paid Fee
                  </Typography>
                  <Typography variant="h6">
                      ₹ {student.paidFee}
                  </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                  <Typography color="text.secondary">
                      Remaining Fee
                  </Typography>
                  <Typography variant="h6">
                      ₹ {student.remainingFee}
                  </Typography>
              </Grid>

              <Grid item xs={12}>
                  <Typography color="text.secondary">
                      Address
                  </Typography>
                  <Typography variant="h6">
                      {student.address || "-"}
                  </Typography>
              </Grid>

          </Grid>
      </Paper>
  );
};

export default ViewStudentPage;