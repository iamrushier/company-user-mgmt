import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid2 as Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCompaniesData } from "../../store/context/CompaniesDataContext";
import { ICompany } from "../../types";

const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  address: z.string().min(1, "Address is required"),
  zip: z.string().min(4, "Zip code must be valid").max(10, "Zip code too long"),
  country: z.string().min(2, "Country must be valid"),
  employeeCount: z.number().min(1, "Must have at least 1 employee"),
  industry: z.string().min(2, "Industry is required"),
  marketCap: z.number().min(0, "Market cap must be positive"),
  domain: z.string().min(1, "Domain is required"),
  logo: z.string().url("Invalid logo URL"),
  ceoName: z.string().min(1, "CEO name is required"),
});

type CompanyFormData = z.infer<typeof companySchema>;

const CompanyForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { data: companies, dispatch } = useCompaniesData();
  const [isEditMode, setIsEditMode] = useState(!isEditing);
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

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  useEffect(() => {
    if (isEditing) {
      const company = companies.find((c) => c.id === Number(id));
      if (company) {
        Object.keys(company).forEach((key) =>
          setValue(key as keyof CompanyFormData, company[key as keyof ICompany])
        );
        setIsEditMode(false);
      } else {
        setSnackbar({
          open: true,
          message: "Company not found!",
          severity: "error",
        });

        setTimeout(() => {
          navigate("/companies");
        }, 2000);
      }
    } else {
      reset();
      setIsEditMode(true);
    }
  }, [id, isEditing, companies, setValue, reset]);

  const onSubmit = (data: CompanyFormData) => {
    if (isEditing) {
      dispatch({
        type: "UPDATE_COMPANY",
        payload: [{ ...data, id: Number(id) }],
      });
      setSnackbar({
        open: true,
        message: "Comapany updated successfully!",
        severity: "success",
      });
    } else {
      const newCompany = { ...data, id: Date.now() };
      dispatch({ type: "ADD_COMPANY", payload: [newCompany] });
      setSnackbar({
        open: true,
        message: "Company added successfully!",
        severity: "success",
      });
    }
    setTimeout(() => {
      navigate("/companies");
    }, 2000);
  };

  return (
    <Container>
      <Paper sx={{ p: 3, mt: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" mb={2}>
          {isEditing ? "Edit Company" : "Add New Company"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Company Name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="CEO Name"
                {...register("ceoName")}
                error={!!errors.ceoName}
                helperText={errors.ceoName?.message}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Industry"
                {...register("industry")}
                error={!!errors.industry}
                helperText={errors.industry?.message}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Zip Code"
                {...register("zip")}
                error={!!errors.zip}
                helperText={errors.zip?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Country"
                {...register("country")}
                error={!!errors.country}
                helperText={errors.country?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Employees"
                type="number"
                {...register("employeeCount", { valueAsNumber: true })}
                error={!!errors.employeeCount}
                helperText={errors.employeeCount?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Market Cap"
                type="number"
                {...register("marketCap", { valueAsNumber: true })}
                error={!!errors.marketCap}
                helperText={errors.marketCap?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Domain"
                {...register("domain")}
                error={!!errors.domain}
                helperText={errors.domain?.message}
                disabled={!isEditMode}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Logo URL"
                {...register("logo")}
                error={!!errors.logo}
                helperText={errors.logo?.message}
                disabled={!isEditMode}
              />
            </Grid>
          </Grid>

          <Box
            sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "flex-end" }}
          >
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  {isEditMode ? "Cancel" : "Edit"}
                </Button>
                {isEditMode && (
                  <Button variant="contained" color="success" type="submit">
                    Update
                  </Button>
                )}
              </>
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Add Company
              </Button>
            )}
          </Box>
        </form>
      </Paper>
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
    </Container>
  );
};

export default CompanyForm;
