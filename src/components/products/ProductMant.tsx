import { useParams } from "react-router-dom";

export const ProductMant = () => {
  const { id } = useParams();
  //const navigate = useNavigate();

  return <div>ProductMant: {id}</div>;
};
