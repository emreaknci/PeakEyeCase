import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CustomThemeContext, CustomThemeProvider } from './contexts/CustomThemeContext';
import { darkTheme, lightTheme } from './themes';
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayoutRoutes from './pages/mainLayoutPages/_MainLayoutRoutes';
import UserLayoutRoutes from './pages/userLayoutPages/_UserLayoutRoutes';

function App() {

  const { theme, toggleTheme } = useContext(CustomThemeContext);
  return (
    <>
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        {/* <button onClick={() => toggleTheme()}>Toggle Theme</button> */}
        <CssBaseline />
        <Router>
          <Routes >
            <Route path="/*" element={<MainLayoutRoutes />} />
            <Route path="me/*" element={<UserLayoutRoutes />} />
            <Route path="*" element={<MainLayoutRoutes />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
