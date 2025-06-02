import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';

export default function UserPage() {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  console.log(userData);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div>
      <p>userData</p>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}
