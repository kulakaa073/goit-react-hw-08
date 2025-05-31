import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { formatPhoneNumber, normalizePhoneNumber } from '../../utils.js';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps.js';

import css from './ContactForm.module.css';

export default function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const initialValues = { name: '', number: '' };
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.name,
        number: formatPhoneNumber(values.number),
      })
    );
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z\s]+$/,
        'Name can only contain letters and spaces',
        true
      )
      .min(3, 'Name must be at least 5 characters long')
      .max(50, 'Name must be 20 characters or less')
      .required('Required'),
    number: Yup.string()
      .transform(value => {
        return normalizePhoneNumber(value);
      })
      .matches(
        /^\+?[0-9]+$/,
        'Phone number can contain only numbers, white space',
        true
      )
      .min(3, 'Number must be at least 5 characters long')
      .max(50, 'Number must be 20 characters or less')
      .required('Required'),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.container}>
        <div className={css.fieldWrap}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field id={nameFieldId} name="name" required />
          <ErrorMessage
            name="name"
            component="span"
            className={css.errorMessage}
          />
        </div>
        <div className={css.fieldWrap}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field id={numberFieldId} name="number" required />
          <ErrorMessage
            name="number"
            component="span"
            className={css.errorMessage}
          />
        </div>
        <button type="submit" className={css.button}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
