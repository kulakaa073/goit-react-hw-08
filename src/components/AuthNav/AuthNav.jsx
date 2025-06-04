import { memo } from 'react';
import { NavLink } from 'react-router';
import clsx from 'clsx';
import styles from './AuthNav.module.css';

export const AuthNav = memo(() => {
  const getActiveLinkClass = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.isActive);
  };
  return (
    <div>
      <NavLink to="/register" className={getActiveLinkClass}>
        Register
      </NavLink>
      <NavLink to="/login" className={getActiveLinkClass}>
        Log In
      </NavLink>
    </div>
  );
});
