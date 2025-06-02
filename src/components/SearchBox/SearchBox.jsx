import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filters/selectors';
import { useDebounce } from 'use-debounce';
import { useState, useEffect, memo } from 'react';
import { setFilter } from '../../redux/filters/slice';

export const SearchBox = memo(() => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const [newFilter, setNewFilter] = useState(filter || '');
  const [debouncedFilter] = useDebounce(newFilter, 250);

  useEffect(() => {
    setNewFilter(newFilter || '');
  }, [newFilter]);

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  useEffect(() => {
    dispatch(setFilter(debouncedFilter));
  }, [debouncedFilter, dispatch]);

  return (
    <div className={css.container}>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={newFilter}
        onChange={handleFilterChange}
        className={css.field}
      />
    </div>
  );
});
