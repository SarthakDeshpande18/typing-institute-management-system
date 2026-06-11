import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

import { IconButton } from "@mui/material";
import { getStudents } from "../services/studentService";

const StudentListPage = () => {

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [totalRows, setTotalRows] = useState(0);

  const [paginationModel, setPaginationModel] =
    useState({
      page: 0,
      pageSize: 5,
    });

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    regNo: "",
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const request = {
        currentPage: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sortBy: "!id",
        filters,
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

  useEffect(() => {
    fetchStudents();
  }, [paginationModel]);

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
    },


    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() =>
              navigate(`/students/${params.row.id}`)
            }
          >
            <VisibilityIcon />
          </IconButton>

          <IconButton
            onClick={() =>
              navigate(
                `/students/edit/${params.row.id}`
              )
            }
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    }


  ];

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        Students
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box
          display="flex"
          gap={2}
        >
          <TextField
            label="First Name"
            value={filters.firstName}
            onChange={(e) =>
              setFilters({
                ...filters,
                firstName:
                  e.target.value,
              })
            }
          />

          <Button
            variant="contained"
            onClick={fetchStudents}
          >
            Search
          </Button>
        </Box>
      </Paper>

      <Paper>
        <DataGrid
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
    </>
  );
};

export default StudentListPage;