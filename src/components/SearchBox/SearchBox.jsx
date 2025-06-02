import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter } from '../../redux/filters/selectors';
import { useDebounce } from 'use-debounce';
import { useState, useEffect, memo } from 'react';

export const SearchBox = memo(() => {
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
    dispatch(selectNameFilter(debouncedName));
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
});
