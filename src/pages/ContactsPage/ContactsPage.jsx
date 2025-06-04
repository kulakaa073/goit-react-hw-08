import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectError,
  selectIsLoading,
  selectFilteredContacts,
} from '../../redux/contacts/selectors';
import {
  fetchContacts,
  deleteContact,
  addContact,
  editContact,
} from '../../redux/contacts/operations';

import { ContactForm } from '../../components/ContactForm/ContactForm';
import { SearchBox } from '../../components/SearchBox/SearchBox.jsx';
import { ContactList } from '../../components/ContactList/ContactList';
import { ContactDeleteConfirmModal } from '../../components/ContactDeleteConfirmModal/ContactDeleteConfirmModal.jsx';
import { formatPhoneNumber, normalizePhoneNumber } from '../../utils.js';
import { selectContactById } from '../../redux/contacts/selectors';
import toast, { Toaster } from 'react-hot-toast';

const ModalMode = Object.freeze({
  Add: 'add',
  Edit: 'edit',
  Delete: 'delete',
  None: 'none',
});

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [modalMode, setModalMode] = useState(ModalMode.None);

  // also saves deleteding contact id
  const [contactToChange, setContactToChange] = useState(null);
  const contact = useSelector(selectContactById(contactToChange));

  const toasts = {
    delete: () => toast('deleting successful!'),
    add: () => toast('adding successful!'),
    edit: () => toast('editing successful!'),
    fail: () => toast('operation failed'),
  };

  const handleDelete = () => {
    dispatch(deleteContact(contactToChange))
      .unwrap()
      .then(() => toasts.delete())
      .catch(() => toasts.fail());
    handleCancel();
  };

  const handleDeleteModalOpen = (contactId = '') => {
    setContactToChange(contactId);
    setModalMode(ModalMode.Delete);
  };

  const handleAdd = contact => {
    dispatch(
      addContact({
        name: contact.name,
        number: formatPhoneNumber(contact.number),
      })
    )
      .unwrap()
      .then(() => toasts.add())
      .catch(() => toasts.fail());
    // one extra setContactToChange called, but its fine, this way code is more uniform
    handleCancel();
  };

  const handleEdit = contact => {
    dispatch(
      editContact({
        contactId: contact.id,
        contactUpdates: {
          name: contact.name,
          number: formatPhoneNumber(normalizePhoneNumber(contact.number)),
        },
      })
    )
      .unwrap()
      .then(() => toasts.edit())
      .catch(() => toasts.fail());
    handleCancel();
  };

  const handleAddModalOpen = () => {
    setModalMode(ModalMode.Add);
  };

  const handleEditModalOpen = contactId => {
    setContactToChange(contactId);
    setModalMode(ModalMode.Edit);
  };

  const handleCancel = () => {
    setContactToChange(null);
    setModalMode(ModalMode.None);
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div>
      <SearchBox />
      <button onClick={handleAddModalOpen}>Add contact</button>
      {isLoading && !error && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ContactList
        contacts={filteredContacts}
        onDelete={handleDeleteModalOpen}
        onEdit={handleEditModalOpen}
      />
      {modalMode === ModalMode.Delete && (
        <ContactDeleteConfirmModal
          onDelete={handleDelete}
          onCancel={handleCancel}
        />
      )}
      {modalMode === ModalMode.Add && (
        <ContactForm onSubmit={handleAdd} onCancel={handleCancel} />
      )}
      {modalMode === ModalMode.Edit && (
        <ContactForm
          onSubmit={handleEdit}
          onCancel={handleCancel}
          contact={contact}
        />
      )}
      <Toaster />
    </div>
  );
}
