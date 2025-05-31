import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox.jsx';
import ContactList from './components/ContactList/ContactList';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectError, selectIsLoading } from './redux/contactsSlice.js';
import { fetchContacts } from './redux/contactsOps.js';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && !error && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ContactList />
    </div>
  );
}

export default App;
