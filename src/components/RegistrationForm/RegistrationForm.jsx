import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../../redux/auth/operations';

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Please enter your name')
      .min(7, 'Name is too short!'),
    email: Yup.string().email().required('Please enter the email'),
    password: Yup.string()
      .required('Please enter the password')
      .min(7, 'Password is too short!'),
  });

  const handleSubmit = (values, actions) => {
    dispatch(
      login({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(console.log('signup success'))
      .catch(console.log('signup failed'));
    // Check behavior what happens next, if its straight logs user in or have to redirect them
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor={nameId}>Name</label>
            <Field id={nameId} name="name" />
            <ErrorMessage name="name" component="span" />
          </div>
          <div>
            <label htmlFor={emailId}>Email</label>
            <Field id={emailId} name="email" />
            <ErrorMessage name="email" component="span" />
          </div>
          <div>
            <label htmlFor={passwordId}>Password</label>
            <Field id={passwordId} name="password" />
            <ErrorMessage name="password" component="span" />
          </div>
          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </div>
  );
}
