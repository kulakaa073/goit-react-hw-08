import css from './Contact.module.css';
import { RiContactsFill } from 'react-icons/ri';
import { FaPhoneAlt } from 'react-icons/fa';
import { memo } from 'react';

export const Contact = memo(({ contact, onEdit, onDelete }) => {
  return (
    <div className={css.container}>
      <div>
        <p>
          <RiContactsFill className={css.icon} />
          {contact.name}
        </p>
        <p>
          <FaPhoneAlt className={css.icon} />
          {contact.number}
        </p>
      </div>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
});
