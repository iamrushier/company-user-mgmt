import { Container, List } from "@mui/material";
import { useCompaniesData } from "../../store/context/CompaniesDataContext";
import CompanyCard from "../components/CompanyCard";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "../../api/api_calls";

const Companies = () => {
  const { data: companyData, dispatch } = useCompaniesData();
  const fetchCompanyData = async () => {
    if (companyData.length > 0) return companyData;
    try {
      const companyData = await getAllCompanies();
      dispatch({ type: "SET_COMPANIES", payload: companyData });
      return companyData;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanyData,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <Container>
      <List>
        {companyData.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </List>
    </Container>
  );
};

export default Companies;
