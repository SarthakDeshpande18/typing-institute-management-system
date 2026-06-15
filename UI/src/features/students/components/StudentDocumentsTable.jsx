import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const StudentDocumentsTable = ({
    documents,
    onDelete,
}) => {
    return (
        <Paper
            sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
            >
                Documents
            </Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr No</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>File Name</TableCell>
                            <TableCell>Upload Date</TableCell>
                            <TableCell align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {documents.length > 0 ? (
                            documents.map(
                                (
                                    document,
                                    index
                                ) => (
                                    <TableRow
                                        key={
                                            document.id
                                        }
                                    >
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>

                                        <TableCell>
                                            {
                                                document.documentType
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                document.fileName
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {new Date(
                                                document.uploadedAt
                                            ).toLocaleDateString("en-GB")}
                                        </TableCell>

                                        <TableCell align="center">
                                            <Button
                                                size="small"
                                                startIcon={
                                                    <VisibilityIcon />
                                                }
                                                href={
                                                    document.fileUrl
                                                }
                                                target="_blank"
                                            >
                                                View
                                            </Button>

                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    onDelete(
                                                        document.id
                                                    )
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    align="center"
                                >
                                    No Documents Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default StudentDocumentsTable;