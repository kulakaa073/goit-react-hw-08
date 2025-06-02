import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectError,
  selectIsLoading,
  selectFilteredContacts,
} from '../../redux/contacts/selectors';
import { fetchContacts, deleteContact } from '../../redux/contacts/operations';

import { ContactForm } from '../../components/ContactForm/ContactForm';
import { SearchBox } from '../../components/SearchBox/SearchBox.jsx';
import { ContactList } from '../../components/ContactList/ContactList';
import { ContactDeleteConfirmModal } from '../../components/ContactDeleteConfirmModal/ContactDeleteConfirmModal.jsx';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleDelete = () => {
    dispatch(deleteContact(contactToDelete));
    setContactToDelete(null);
    setIsDeleteModalOpen(prev => !prev);
  };

  const handleDeleteModalToggle = (contactId = '') => {
    setContactToDelete(contactId);
    setIsDeleteModalOpen(prev => !prev);
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div>
      <ContactForm />
      <SearchBox />
      {isLoading && !error && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ContactList
        contacts={filteredContacts}
        onDelete={handleDeleteModalToggle}
      />
      {isDeleteModalOpen && (
        <ContactDeleteConfirmModal
          onDelete={handleDelete}
          onCancel={handleDeleteModalToggle}
        />
      )}
    </div>
  );
}
