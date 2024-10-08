import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CustomThemeProvider } from './contexts/CustomThemeContext.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import { AuthProvider } from './contexts/AuthContext.tsx'
import { SearchProvider } from './contexts/SearchTermContext.tsx'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ToastContainer
      position="top-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <AuthProvider>
      <CustomThemeProvider>
          <App />
      </CustomThemeProvider>
    </AuthProvider>
  </>
)
