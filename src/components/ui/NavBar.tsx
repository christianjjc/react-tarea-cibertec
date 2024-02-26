import { Link } from "react-router-dom";

const menuPrincipal = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/movies", label: "Movies" },
];

export const NavBar = () => {
  return (
    <nav className="navbar bg-dark border-bottom border-body navbar-expand-sm" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          CJJC
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {menuPrincipal.map((el) => (
              <li key={el.label} className="nav-item">
                <Link className="nav-link" aria-current="page" to={el.href}>
                  {el.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
