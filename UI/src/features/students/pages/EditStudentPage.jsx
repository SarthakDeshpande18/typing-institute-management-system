import {
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { SUBJECTS } from "../../../constants/subjects";
import {
    useEffect,
    useState,
} from "react";

import {
    MenuItem
} from "@mui/material";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getStudentById,
    updateStudent,
} from "../services/studentService";

const EditStudentPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

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

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        try {
            const response =
                await getStudentById(id);

            const student =
                response.data;

            setFormData({
                firstName: student.firstName || "",
                lastName: student.lastName || "",
                mobileNo: student.mobileNo || "",
                motherName: student.motherName || "",
                address: student.address || "",
                admissionDate: student.admissionDate || "",
                subject: student.subject || "",
                totalFee: student.totalFee || "",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            await updateStudent(
                id,
                formData
            );

            alert(
                "Student Updated Successfully"
            );

            navigate("/students");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
            >
                Edit Student
            </Typography>

            <form
                onSubmit={handleSubmit}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={
                                formData.firstName
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={
                                formData.lastName
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Mobile"
                            name="mobileNo"
                            value={
                                formData.mobileNo
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Mother Name"
                            name="motherName"
                            value={
                                formData.motherName
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Admission Date"
                            name="admissionDate"
                            value={formData.admissionDate}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={
                                formData.address
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        >
                            {
                                SUBJECTS.map((subject) => (
                                    <MenuItem
                                        key={subject.value}
                                        value={subject.value}
                                    >
                                        {subject.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Total Fee"
                            name="totalFee"
                            value={
                                formData.totalFee
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={
                                loading
                            }
                        >
                            {loading
                                ? "Updating..."
                                : "Update Student"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default EditStudentPage;