import { Link } from "react-router-dom";
import { navItems } from "../../utils/NavRoute";

export const Navbar: React.FC = () => {
  return (
    <nav>
      <ul
        className="menu menu-default flex flex-col rounded-lg w-full max-w-56"
        data-menu="true"
      >
        {navItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
