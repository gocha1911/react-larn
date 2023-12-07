import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Main from './pages/Main/Main';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import CreatePost from './pages/CreatePost/CreatePost';

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          {!user ? <Route path='/login' element={<Login />} /> : <Route path='/createPost' element={<CreatePost />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
