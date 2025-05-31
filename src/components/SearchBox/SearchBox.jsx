import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter, selectNameFilter } from '../../redux/filtersSlice';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';

export default function SearchBox() {
  const nameFilter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const [newName, setNewName] = useState(nameFilter || '');
  const [debouncedName] = useDebounce(newName, 250);

  useEffect(() => {
    setNewName(nameFilter || '');
  }, [nameFilter]);

  const handleChange = event => {
    setNewName(event.target.value);
  };

  useEffect(() => {
    dispatch(setNameFilter(debouncedName));
  }, [debouncedName, dispatch]);

  return (
    <div className={css.container}>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={newName}
        onChange={handleChange}
        className={css.field}
      />
    </div>
  );
}
