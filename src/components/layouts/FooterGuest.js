import React from "react";
import { Link } from "react-router-dom";

const FooterGuest = () => (
  <footer>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/documentation">Documentation</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
    <div>
      <small>
        &copy; {new Date().getFullYear()} GM Admin. Built by{" "}
        <a href="https://www.iamtimsmith.com">Tim Smith</a>
      </small>
    </div>
  </footer>
);
export default FooterGuest;
