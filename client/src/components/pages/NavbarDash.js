import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export const NavbarDash = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/Dashboard" className="title">
        User Dashboard
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/create">Create</NavLink>
        </li>
        <li>
          <NavLink to="/gallery">Gallery</NavLink>
        </li>
        <li>
          <NavLink to="/account">Account</NavLink>
        </li>
        {/* Add more internal page links here */}
      </ul>
    </nav>
  );
};
