import { Route } from "react-router-dom";
import ProtectedReadCompanies from "../protected_routes/ProtectedReadCompanies";
import SidebarLayout from "../components/SidebarLayout";
import Companies from "../pages/Companies";
import ProtectedWriteCompanies from "../protected_routes/ProtectedWriteCompanies";
import CompanyForm from "../components/company/CompanyForm";
import CompanyDetails from "../components/company/CompanyDetails";

const CompanyRoutes = () => {
  return (
    <Route element={<ProtectedReadCompanies />}>
      <Route path="/companies" element={<SidebarLayout title="Companies" />}>
        <Route index element={<Companies />} />
        <Route element={<ProtectedWriteCompanies />}>
          <Route path="add" element={<CompanyForm />} />
          <Route path="edit/:id" element={<CompanyForm />} />
        </Route>
        <Route path=":id" element={<CompanyDetails />} />
      </Route>
    </Route>
  );
};

export default CompanyRoutes;
