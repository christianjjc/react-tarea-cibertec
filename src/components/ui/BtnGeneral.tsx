import { Link } from "react-router-dom";

interface Props {
  href: string;
  label: string;
}

export const BtnGeneral = ({ href, label }: Props) => {
  return (
    <Link className="btn btn-secondary w-100" to={href}>
      {label}
    </Link>
  );
};
