import Layout from './components/Layout/Layout.jsx';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectTheme } from './redux/theme/selectors';

function App() {
  const theme = useSelector(selectTheme); // e.g., 'light' or 'dark'

  useEffect(() => {
    const root = document.getElementById('root');
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <>
      <Layout />
    </>
  );
}

export default App;
