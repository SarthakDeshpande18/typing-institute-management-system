import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    TextField,
} from "@mui/material";

import { useState } from "react";

import {
    uploadStudentDocument,
} from "../services/studentService";

const UploadDocumentDialog = ({
    open,
    onClose,
    studentId,
    onSuccess,
}) => {

    const [documentType,
        setDocumentType] =
        useState("");

    const [file, setFile] =
        useState(null);

    const handleUpload = async () => {

        if (!file) {

            onSuccess(
                "Document is required",
                "error"
            );

            return;
        }

        try {

            await uploadStudentPhoto(
                studentId,
                file
            );

            onSuccess(
                "Photo uploaded successfully",
                "success"
            );

            onClose();

        } catch (error) {

            onSuccess(
                error.response?.data?.message ||
                "Failed to upload photo",
                "error"
            );
        }
    };
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Upload Document
            </DialogTitle>

            <DialogContent>

                <TextField
                    select
                    fullWidth
                    label="Document Type"
                    value={documentType}
                    onChange={(e) =>
                        setDocumentType(
                            e.target.value
                        )
                    }
                    sx={{ mt: 2 }}
                >
                    <MenuItem value="LC">
                        LC
                    </MenuItem>

                    <MenuItem value="AADHAR_CARD">
                        Aadhar Card
                    </MenuItem>

                    <MenuItem value="SSC_MARKSHEET">
                        SSC Marksheet
                    </MenuItem>

                </TextField>

                <input
                    type="file"
                    onChange={(e) =>
                        setFile(
                            e.target.files[0]
                        )
                    }
                    style={{
                        marginTop: 20,
                    }}
                />

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleUpload}
                >
                    Upload
                </Button>

            </DialogActions>
        </Dialog>
    );
};

export default UploadDocumentDialog;