import { createContext, useState } from 'react';
import './App.css';
import Login from './Components/auth/Login';
import Signup from './Components/auth/SignUp';
import LandingPage from './Components/LandingPage';
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import { Navbar } from './common/Navbar';
import { CreateForm } from './Components/CreateForm';
import AnalyticsPage from './Components/Analytics';
import SettingsPage from './Components/Setting';
export const FormContext = createContext();
export const ThemeContext = createContext({ toggleTheme: () => { } });
function App() {
  const [option, setOption] = useState({});
  const [darkMode, setDarkMode] = useState(option?.darkMode);
  const [openModal, setOpenModal] = useState(false);
  const [folders, setFolders] = useState([]);
  // Define Light and Dark Themes
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#ffffff",
        paper: "#f5f5f5",
      },
      text: {
        primary: "#000000",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  // Theme Toggle Handler
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="App">
      <ThemeContext.Provider value={{ toggleTheme }}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <FormContext.Provider value={{ folders, setFolders }}>
          <Router basename="/">
            <Routes>
              <Route path='/' element={<LandingPage />}>
                <Route path='landing' element={<LandingPage />} />
              </Route>
              <Route path="/auth" element={<Signup />}>
                <Route path="register" element={<Signup />} />
              </Route>
              <Route path="/auth" element={<Login />}>
                <Route path="login" element={<Login />} />
              </Route>
              <Route path='dashboard' element={<Navbar setDarkMode={setDarkMode} setOpenModal={setOpenModal}><Dashboard darkMode={darkMode} openModal={openModal}/></Navbar>}/>
              <Route path='createForm/:folderId/:id' element={<Navbar setDarkMode={setDarkMode} setOpenModal={setOpenModal}><CreateForm darkMode={darkMode} openModal={openModal} /></Navbar>} />
                <Route path='analytics' element={<Navbar setDarkMode={setDarkMode} setOpenModal={setOpenModal}><AnalyticsPage/></Navbar>} />
                <Route path='settings' element={<Navbar setDarkMode={setDarkMode} setOpenModal={setOpenModal}><SettingsPage /></Navbar>} />
            </Routes>
          </Router>
            </FormContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
