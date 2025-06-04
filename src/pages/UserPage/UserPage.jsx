import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import { selectTheme } from '../../redux/theme/selectors';
import { toggleTheme } from '../../redux/theme/slice';

export default function UserPage() {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleThemeSwitch = () => {
    console.log('handlethemeswitch');
    dispatch(toggleTheme());
  };

  return (
    <div>
      <p>userData</p>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Current theme: {theme}</p>
      <button onClick={handleThemeSwitch}>
        Switch to {theme === 'light' ? 'dark' : 'light'}
      </button>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
