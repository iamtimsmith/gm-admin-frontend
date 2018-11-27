import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/d20.png";

const NavbarGuest = () => (
  <nav>
    <div>
      <p>
        <Link to="/">
          <img src={Logo} alt="GM Admin" />
        </Link>
      </p>
      <ul>
        <li>
          <Link to="/documentation">Learn</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  </nav>
);
export default NavbarGuest;
