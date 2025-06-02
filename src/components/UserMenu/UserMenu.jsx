import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router';
import { logout } from '../../redux/auth/operations';
import { memo } from 'react';

export const UserMenu = memo(() => {
  const dispatch = useDispatch();
  const handleLogOut = () => dispatch(logout());
  return (
    <div>
      <NavLink to="/user">User Page</NavLink>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
});
