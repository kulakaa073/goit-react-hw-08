import { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export const Navigation = memo(() => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
    </div>
  );
});
