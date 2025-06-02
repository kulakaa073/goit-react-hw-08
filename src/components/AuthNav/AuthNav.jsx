import { memo } from 'react';
import { NavLink } from 'react-router';

export const AuthNav = memo(() => {
  return (
    <div>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log In</NavLink>
    </div>
  );
});
