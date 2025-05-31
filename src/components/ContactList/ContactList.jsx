import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectFilteredContacts,
} from '../../redux/contactsSlice';

export default function ContactList() {
  const filteredcontacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.container}>
      {!selectIsLoading && filteredcontacts.length === 0 && (
        <li>No contacts found.</li>
      )}
      {filteredcontacts.map(contact => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
