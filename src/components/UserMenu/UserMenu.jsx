import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/auth/operations';
import { memo, useEffect, useRef, useState } from 'react';
import styles from './UserMenu.module.css';
import clsx from 'clsx';

export const UserMenu = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const menuRef = useRef();

  const getActiveLinkClass = ({ isActive }) =>
    clsx(styles.link, isActive && styles.isActive);

  const handleLogOut = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const getMenuToggleClass = clsx(styles.link, isMenuOpen && styles.isActive);

  // Attach eventListener if menu is open to close it on click
  useEffect(() => {
    const handleClick = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    // Check if menu is opened first
    if (isMenuOpen) {
      console.log('attaching event listener');
      document.addEventListener('mousedown', handleClick);
    }
    // remove event listener on refresh, remove always just in case junk
    return () => {
      console.log('removing event listener');
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isMenuOpen]);

  return (
    <div ref={menuRef}>
      <p onClick={toggleMenu} className={getMenuToggleClass}>
        Menu
      </p>
      {isMenuOpen && (
        <div className={styles.menuDropdown}>
          <NavLink
            to="/user"
            onClick={toggleMenu}
            className={getActiveLinkClass}
          >
            User Page
          </NavLink>
          <button onClick={handleLogOut} className={styles.logoutButton}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
});
