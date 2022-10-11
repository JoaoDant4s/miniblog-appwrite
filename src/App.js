import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { AuthProvider } from './context/AuthContext';

//hooks
import { useState, useEffect, useContext } from "react"
import Search from './pages/Search/Search';
import SinglePost from './pages/SinglePost/SinglePost';
import { AuthContextUser } from './context/AuthContextUser';
import { account } from './appwrite/appwriteConfig';

function App() {
  const [user] = useState(undefined)
  const { userAuth, setUserAuth } = useContext(AuthContextUser)
  const loadingUser = userAuth === null

  useEffect(() => {
    if(localStorage.getItem("cookieFallback")){
      account.get().then((response) => {
        setUserAuth(response)
        console.log(response)
        }, (error) => {
          setUserAuth("")
          console.log(error)
        }
      )
    } else {
      setUserAuth(false)
    }
  }, [])
  
  if(loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
        <AuthProvider value={{user}}>
          <BrowserRouter>
            <NavBar />
              <Routes className="rotas">
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/posts/:id" element={<SinglePost />} />
                <Route 
                  path="/login" 
                  element={!userAuth ? <Login /> : <Navigate to="/"/>} 
                />
                <Route 
                  path="/register" 
                  element={!userAuth ? <Register /> : <Navigate to="/" />}
                />
                <Route 
                  path="/dashboard" 
                  element={userAuth ? <Dashboard /> : <Navigate to="/login" />} 
                />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
    </div>
  );
}

export default App;
