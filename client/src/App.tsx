import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CustomThemeContext } from './contexts/CustomThemeContext';
import { darkTheme, lightTheme } from './themes';
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayoutRoutes from './pages/mainLayoutPages/_MainLayoutRoutes';
import UserLayoutRoutes from './pages/userLayoutPages/_UserLayoutRoutes';
import SignUpPage from './pages/mainLayoutPages/SignUpPage';
import SignInPage from './pages/mainLayoutPages/SignInPage';
import { AuthContext } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchTermContext';

function App() {
  const { isAuthenticated, isTokenChecked } = useContext(AuthContext);
  const { theme } = useContext(CustomThemeContext);
  return (
    <>
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <SearchProvider>
            <Routes>
              {isTokenChecked && (
                <>
                  <Route path="/*" element={<MainLayoutRoutes />} />
                  {isAuthenticated ? (
                    <>
                      <Route path="me/*" element={<UserLayoutRoutes />} />
                    </>
                  ) : (
                    <>
                      <Route path="/sign-up" element={<SignUpPage />} />
                      <Route path="/sign-in" element={<SignInPage />} />
                    </>
                  )}
                  <Route path="*" element={<MainLayoutRoutes />} />
                </>
              )}
            </Routes>

          </SearchProvider>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
