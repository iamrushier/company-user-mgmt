import {
  Box,
  Button,
  Card,
  Container,
  List,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useCompaniesData } from "../../store/context/CompaniesDataContext";
import CompanyCard from "../components/CompanyCard";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "../../api/api_calls";
import { ICompany } from "../../types";
import { useReducer, useState } from "react";
import { Clear, FilterAlt, Sort } from "@mui/icons-material";

enum SORT_BY {
  MARKET_CAP_ASC = "MARKET_CAP_ASC",
  MARKET_CAP_DESC = "MARKET_CAP_DESC",
}
const companiesReducer = (
  state: ICompany[],
  action: {
    type: string;
    payload: ICompany[];
    marketCap?: { min: number; max: number | undefined };
    sortCondition?: SORT_BY;
  }
) => {
  switch (action.type) {
    case "SET_COMPANIES":
      return action.payload;
    case "FILTER":
      if (action.marketCap === undefined) return action.payload;
      if (action.marketCap.max === undefined)
        return action.payload.filter(
          (company) => company.marketCap >= action.marketCap?.min!
        );

      return action.payload.filter(
        (company) =>
          company.marketCap >= action.marketCap?.min! &&
          company.marketCap <= action.marketCap?.max!
      );
    case "CLEAR_FILTER":
      return action.payload;
    case "SORT":
      if (action.sortCondition === undefined) return state;
      if (action.sortCondition === SORT_BY.MARKET_CAP_ASC) {
        return state.slice().sort((a, b) => a.marketCap - b.marketCap);
      } else if (action.sortCondition === SORT_BY.MARKET_CAP_DESC) {
        return state.slice().sort((a, b) => b.marketCap - a.marketCap);
      } else {
        return state;
      }
    default:
      return state;
  }
};

const Companies = () => {
  const { data: companyData, dispatch } = useCompaniesData();
  const [localData, dispatchLocalData] = useReducer(
    companiesReducer,
    companyData
  );
  const [marketCapFilter, setMarketCapFilter] = useState({
    min: 0,
    max: Infinity,
  });
  const [sortOption, setSortOption] = useState<SORT_BY | "">("");

  const fetchCompanyData = async () => {
    if (companyData.length > 0) return companyData;
    try {
      const companyData = await getAllCompanies();
      dispatch({ type: "SET_COMPANIES", payload: companyData });
      dispatchLocalData({ type: "SET_COMPANIES", payload: companyData });
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

  const handleFilter = () => {
    if (!marketCapFilter) return;
    dispatchLocalData({
      type: "FILTER",
      marketCap: marketCapFilter,
      payload: companyData,
    });
  };

  const clearFilter = () => {
    setMarketCapFilter({ min: 0, max: Infinity });
    setSortOption("");
    dispatchLocalData({ type: "CLEAR_FILTER", payload: companyData });
  };

  const handleSort = (event: any) => {
    const value = event.target.value as SORT_BY;
    setSortOption(value);
    dispatchLocalData({
      type: "SORT",
      sortCondition: value,
      payload: companyData,
    });
  };

  return (
    <Container>
      <Card
        sx={{
          p: 3,
          mb: 3,
          boxShadow: 2,
          borderRadius: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            type="number"
            label="Min Market Cap"
            value={marketCapFilter.min}
            onChange={(e) =>
              setMarketCapFilter({
                ...marketCapFilter,
                min: Math.max(0, Number(e.target.value)),
              })
            }
            size="small"
            sx={{ width: 120 }}
          />

          <TextField
            type="number"
            label="Max Market Cap"
            value={marketCapFilter.max}
            onChange={(e) =>
              setMarketCapFilter({
                ...marketCapFilter,
                max: Number(e.target.value),
              })
            }
            size="small"
            sx={{ width: 120 }}
          />

          <Button
            variant="contained"
            onClick={handleFilter}
            startIcon={<FilterAlt />}
          >
            Filter
          </Button>
        </Box>
        <Select
          value={sortOption}
          onChange={handleSort}
          displayEmpty
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">
            <Sort fontSize="small" sx={{ mr: 1 }} /> Market Cap
          </MenuItem>
          <MenuItem value={SORT_BY.MARKET_CAP_ASC}>⬆ Ascending</MenuItem>
          <MenuItem value={SORT_BY.MARKET_CAP_DESC}>⬇ Descending</MenuItem>
        </Select>
        <Button variant="outlined" onClick={clearFilter} startIcon={<Clear />}>
          Clear
        </Button>
      </Card>

      <List>
        {localData.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </List>
    </Container>
  );
};

export default Companies;
