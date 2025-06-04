import { useDispatch } from 'react-redux';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { register } from '../../redux/auth/operations';

export default function RegistrationPage() {
  const dispatch = useDispatch();

  const handleSignup = signupData => {
    dispatch(
      register({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      })
    )
      .unwrap()
      .then(console.log('signup success'))
      .catch(console.log('signup failed'));
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleSignup} />
    </div>
  );
}
