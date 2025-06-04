import { useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import { login } from '../../redux/auth/operations';

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = loginData => {
    dispatch(login({ email: loginData.email, password: loginData.password }))
      .unwrap()
      .then(console.log('login success'))
      .catch(console.log('login failed'));
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}
