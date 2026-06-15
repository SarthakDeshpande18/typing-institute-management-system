import {
    Paper,
    Typography,
    Box,
} from "@mui/material";

const DashboardCard = ({
    title,
    value,
}) => {
    return (
        <Paper
            elevation={4}
            sx={{
                p: 3,
                borderRadius: 4,
                height: "100%",
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-5px)",
                },
            }}
        >
            <Box>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={500}
                >
                    {title}
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                        mt: 2,
                        color: "#1976d2",
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Paper>
    );
};

export default DashboardCard;