import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-green-100 text-black hover:bg-green-500 hover:text-zinc-50 px-4 py-1 rounded-md">
    {children}
  </Link>
);
