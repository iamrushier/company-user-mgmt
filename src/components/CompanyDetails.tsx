import { useParams } from "react-router-dom";

const CompanyDetails = () => {
  const { id } = useParams();
  return <div>CompanyDetails - {id}</div>;
};

export default CompanyDetails;
