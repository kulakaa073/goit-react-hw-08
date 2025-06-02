import { Contact } from '../Contact/Contact';
import css from './ContactList.module.css';

import { memo } from 'react';

export const ContactList = memo(({ contacts, onDelete }) => {
  return (
    <ul className={css.container}>
      {contacts.length === 0 && <li>No contacts found.</li>}
      {contacts.map(contact => (
        <li key={contact.id}>
          <Contact contact={contact} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
});
