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
    const handleClose = () => {
        setFile(null);
        onClose();
    };
    const handleUpload = async () => {

        console.log("Selected File:", file);
        
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

            setFile(null);

            onSuccess(
                "Photo uploaded successfully",
                "success"
            );

            handleClose();

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
            onClose={handleClose}
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
                    onClick={handleClose}
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