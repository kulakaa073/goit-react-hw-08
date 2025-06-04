import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';

export default function LoginForm({ onSubmit }) {
  const emailId = useId();
  const passwordId = useId();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Please enter the email'),
    password: Yup.string().required('Please enter the password'),
  });

  const handleSubmit = (values, actions) => {
    onSubmit(values);
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
