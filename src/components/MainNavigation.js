import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/MainNavigation.css';

const mainNavigation = () => {
    return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>Bridge International Academics</h1>
          </div>
          <nav className="main-navigation__items">
            <ul>
               <li>
                  <NavLink to="/battery">All batteries</NavLink>
                </li>
              <li>
                <NavLink to="/academy">Academy</NavLink>
              </li>
            </ul>
          </nav>
        </header>
      );
};

export default mainNavigation;