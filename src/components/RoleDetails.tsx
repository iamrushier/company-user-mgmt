import { useParams } from "react-router-dom";

const RoleDetails = () => {
  const { id } = useParams();
  return <div>RoleDetails - {id}</div>;
};

export default RoleDetails;
