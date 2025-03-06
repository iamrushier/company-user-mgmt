import { Box, Typography, Stack } from "@mui/material";
const Error404 = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h1" color="error" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h6" color="text.secondary">
          The page you’re looking for doesn’t exist.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Error404;
