import { useParams } from "react-router-dom";

const UserForm = () => {
  const { id } = useParams();

  return <div>{id ? `Edit user ${id}` : "Add new user"}</div>;
};

export default UserForm;
