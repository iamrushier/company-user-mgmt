import { useParams, useNavigate } from "react-router-dom";
import { useCompaniesData } from "../../../store/context/CompaniesDataContext";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Avatar,
  Button,
  Grid2 as Grid,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Business,
  Edit,
  Delete,
  LocationOn,
  Groups,
  Domain,
  AttachMoney,
  ArrowBack,
  AccountCircle,
} from "@mui/icons-material";
import { useState } from "react";
import { useAuthUserStore } from "../../../store/zustand/AuthUserStore";
import useRoleStore from "../../../store/zustand/RolesActionsStore";

const CompanyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: companies, dispatch } = useCompaniesData();
  const navigate = useNavigate();
  const company = companies.find((c) => c.id === Number(id));
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { user: loggedInUser } = useAuthUserStore();
  const { roles } = useRoleStore();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  const userRole =
    loggedInUser && typeof loggedInUser === "object" && "role" in loggedInUser
      ? loggedInUser.role
      : null;

  if (!company)
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error" variant="h6">
          Company not found.
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/companies")}
          sx={{ mt: 2 }}
        >
          Back to Companies
        </Button>
      </Box>
    );

  const handleConfirmDelete = () => {
    if (userRole && roles[userRole]?.companies?.read_write) {
      setSnackbar({
        open: true,
        message: "Company is being deleted!",
        severity: "error",
      });
      setTimeout(() => {
        dispatch({ type: "DELETE_COMPANY", id: company.id });
        setDeleteDialogOpen(false);
        navigate("/companies");
      }, 2000);
    } else {
      setSnackbar({
        open: true,
        message: "You are not authorized to perform this action!",
        severity: "error",
      });
      setTimeout(() => {
        setDeleteDialogOpen(false);
        return;
      }, 1000);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, px: 2 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/companies")}
        variant="text"
        color="primary"
        sx={{ mb: 3 }}
      >
        Back to Companies
      </Button>

      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 80, height: 80 }}
              src={company.logo || ""}
              alt={company.name}
            >
              {!company.logo && <Business sx={{ fontSize: 50 }} />}
            </Avatar>
          }
          title={
            <Typography variant="h5" fontWeight="bold">
              {company.name}
            </Typography>
          }
          subheader={
            <Chip
              label={company.industry}
              size="small"
              variant="outlined"
              sx={{ mt: 0.5 }}
            />
          }
          action={
            userRole &&
            roles[userRole]?.companies?.read_write && (
              <Box sx={{ display: "flex", gap: 1, mt: 1, mr: 1 }}>
                <Tooltip title="Edit Company">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/companies/edit/${id}`)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Company">
                  <IconButton
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )
          }
          sx={{ pb: 0 }}
        />

        <Divider sx={{ mx: 2, my: 2 }} />

        <CardContent sx={{ pt: 2, px: 3 }}>
          <Grid container spacing={3}>
            {[
              ["CEO", company.ceoName, <AccountCircle color="action" />],
              [
                "Market Cap",
                `$${company.marketCap.toLocaleString()}`,
                <AttachMoney color="action" />,
              ],
              [
                "Employee Count",
                `${company.employeeCount} employees`,
                <Groups color="action" />,
              ],
              ["Website", company.domain, <Domain color="action" />],
              [
                "Address",
                `${company.address}, ${company.zip}, ${company.country}`,
                <LocationOn color="action" />,
              ],
            ].map(([label, value, icon], index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body1">{value}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {company.name}? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CompanyDetails;
