import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DescriptionIcon from "@mui/icons-material/Description";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { getStudents, deleteStudent, } from "../services/studentService";
import UploadPhotoDialog from "../components/UploadPhotoDialog";
import UploadDocumentDialog from "../components/UploadDocumentDialog";

const StudentListPage = () => {

  const navigate = useNavigate();
  const [deleteId, setDeleteId] =
    useState(null);

  const [openDialog, setOpenDialog] =
    useState(false);

  const [snackbar, setSnackbar] =
    useState({
      open: false,
      message: "",
      severity: "success",
    });
  const [photoOpen,
    setPhotoOpen] =
    useState(false);

  const [documentOpen,
    setDocumentOpen] =
    useState(false);

  const [selectedStudentId,
    setSelectedStudentId] =
    useState(null);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [totalRows, setTotalRows] = useState(0);

  const [paginationModel, setPaginationModel] =
    useState({
      page: 0,
      pageSize: 5,
    });

  const [searchText, setSearchText] =
    useState("");

  const [filters, setFilters] =
    useState({
      search: "",
    });

  const fetchStudents = async (
    appliedFilters = filters
  ) => {
    try {
      setLoading(true);

      const request = {
        currentPage:
          paginationModel.page + 1,
        pageSize:
          paginationModel.pageSize,
        sortBy: "!id",
        filters: appliedFilters,
      };

      const response =
        await getStudents(request);

      setStudents(
        response.data.results
      );

      setTotalRows(
        response.data.totalCount
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteStudent(deleteId);

      setSnackbar({
        open: true,
        message: "Student deleted successfully",
        severity: "success",
      });

      fetchStudents();
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to delete student",
        severity: "error",
      });
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [
    paginationModel.page,
    paginationModel.pageSize,
  ]);

  const columns = [
    {
      field: "regNo",
      headerName: "Reg No",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "mobileNo",
      headerName: "Mobile",
      flex: 1,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
    },
    {
      field: "remainingFee",
      headerName: "Remaining Fee",
      flex: 1,

      renderCell: (params) => (
        <Chip
          label={`₹ ${params.value}`}
          color={
            params.value > 0
              ? "warning"
              : "success"
          }
          size="small"
        />
      ),
    },


    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 250,
      sortable: false,

      renderCell: (params) => (
        <>
          <Tooltip title="View Student">
            <IconButton
              size="small"
              onClick={() =>
                navigate(`/students/${params.row.id}`)
              }
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit Student">
            <IconButton
              size="small"
              onClick={() =>
                navigate(`/students/edit/${params.row.id}`)
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Student">
            <IconButton
              size="small"
              color="error"
              onClick={() => {
                setDeleteId(params.row.id);
                setOpenDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Upload Photo">
            <IconButton
              color="primary"
              onClick={() => {
                setSelectedStudentId(
                  params.row.id
                );
                setPhotoOpen(true);
              }}
            >
              <PhotoCameraIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Upload Document">
            <IconButton
              color="secondary"
              onClick={() => {
                setSelectedStudentId(
                  params.row.id
                );
                setDocumentOpen(true);
              }}
            >
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    }


  ];

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 4,
          background:
           "linear-gradient(135deg, #198bd2 0%, #1565c0 100%)",
          color: "white",
          boxShadow: "0 8px 24px rgba(25,118,210,0.25)",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
         
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              Students
            </Typography>

             <Typography
              variant="h5"
              fontWeight={700}
            >
              View, search and manage student records
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: 3,
            mb: 3,
          }}
        >
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              borderLeft:
                "5px solid #1976d2",
            }}
          >
            <Typography color="text.secondary">
              Total Students
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {totalRows}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              borderLeft:
                "5px solid #2e7d32",
            }}
          >
            <Typography color="text.secondary">
              Current Page Records
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {students.length}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              borderLeft:
                "5px solid #ed6c02",
            }}
          >
            <Typography color="text.secondary">
              Pending Fees
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              ₹
              {students
                .reduce(
                  (sum, student) =>
                    sum +
                    (student.remainingFee ||
                      0),
                  0
                )
                .toLocaleString()}
            </Typography>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: 3,
            mb: 3,
          }}
        ></Box>
        <Typography
          variant="h6"
          fontWeight={600}
          mb={2}
        >
          Search Students
        </Typography>

        <Box>
          <TextField
            fullWidth
            placeholder="Search by First Name, Last Name or Reg No"
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
          />

          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: 2,
            }}
          >

            <Button
              variant="contained"
              onClick={() => {
                const newFilters = {
                  search: searchText,
                };

                setFilters(newFilters);

                fetchStudents(newFilters);
              }}
            >
              Search
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                const newFilters = {
                  search: "",
                };

                setSearchText("");

                setFilters(newFilters);

                fetchStudents(newFilters);
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Paper>

      <Paper
        sx={{
          borderRadius: 4,
          overflow: "hidden",
        }}
      >

        <DataGrid
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8fafc",
              fontWeight: 700,
              borderBottom: "1px solid #e2e8f0",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f8fafc",
            },

            "& .MuiDataGrid-cell": {
              borderColor: "#f1f5f9",
            },
          }}
          rows={students}
          columns={columns}
          loading={loading}
          rowCount={totalRows}
          paginationMode="server"
          paginationModel={
            paginationModel
          }
          onPaginationModelChange={
            setPaginationModel
          }
          pageSizeOptions={[
            5,
            10,
            20,
          ]}
          autoHeight
        />
      </Paper>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          Delete Student
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={confirmDelete}
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
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>


      <UploadPhotoDialog
        open={photoOpen}
        onClose={() => setPhotoOpen(false)}
        studentId={selectedStudentId}
        onSuccess={(message, severity = "success") =>
          setSnackbar({
            open: true,
            message,
            severity,
          })
        }
      />

      <UploadDocumentDialog
        open={documentOpen}
        onClose={() => setDocumentOpen(false)}
        studentId={selectedStudentId}
        onSuccess={(message, severity = "success") =>
          setSnackbar({
            open: true,
            message,
            severity,
          })
        }
      />
    </>


  );
};

export default StudentListPage;