import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

import { useState } from "react";

import {
    uploadStudentPhoto,
} from "../services/studentService";

const UploadPhotoDialog = ({
    open,
    onClose,
    studentId,
    onSuccess,
}) => {

    const [file, setFile] =
        useState(null);

    const handleUpload = async () => {

        if (!file) {

            onSuccess(
                "Photo is required",
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
                Upload Photo
            </DialogTitle>

            <DialogContent>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFile(
                            e.target.files[0]
                        )
                    }
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

export default UploadPhotoDialog;