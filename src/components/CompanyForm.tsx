import { useParams } from "react-router-dom";

const CompanyForm = () => {
  const { id } = useParams();

  return <div>{id ? `Edit company ${id}` : "Add new company"}</div>;
};

export default CompanyForm;
