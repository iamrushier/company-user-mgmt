import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      Users
      <input
        type="number"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button onClick={() => navigate(`/users/${id}`)}>Details</button>
      <button onClick={() => navigate(`/users/edit/${id}`)}>Edit</button>
    </>
  );
};

export default Users;
