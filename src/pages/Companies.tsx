import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      Comapnies
      <input
        type="number"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button onClick={() => navigate(`/companies/${id}`)}>Details</button>
      <button onClick={() => navigate(`/companies/edit/${id}`)}>Edit</button>
    </>
  );
};

export default Companies;
