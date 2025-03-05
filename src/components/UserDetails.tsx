import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  return <div>UserDetails - {id}</div>;
};

export default UserDetails;
