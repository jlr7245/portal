import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import Logout from '../datalayer/Logout';

import './Footer.scss';

const Footer = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="footer-holder">
      <ul className="linkset">
        <li>
          <Link to="/about">About</Link>
        </li>
        {!auth.isLoggedIn ? (
          <>
            <li>
              <Link to="/">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dash">Dashboard</Link>
            </li>
            <li>
              <Link to="/logout">Log Out</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Footer;
