import './App.css';
import  {useState } from 'react'

import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert=(type,message)=>{
     setAlert({type,message})
     setTimeout(() => {
      setAlert(null)
     }, 1500);
  }

  return (
    <>
    <NoteState>
    <Router>
     <Navbar/>
     <Alert alert={alert}/>
     
     <div className="container">
    {/* -------------------React Router------------ */}
    <Routes>
    <Route exact path='/' element={<Home showAlert={showAlert}/>} />
    <Route exact path='/about' element={<About />} />
    <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
    <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />
    </Routes>
    </div>
    
    <footer class="container">
    <hr style={{margin:"70px 0px 70px 0px"}}></hr>
      <p class="float-end fst-italic">by <strong> Shahzaib </strong></p>
      <p>© 2022 iNoteBook, Inc. All Right Reserved </p>
    </footer>
    
    </Router>
    </NoteState>
    </>
  );
}

export default App;
