import React from 'react'
import NavbarLogo from '../images/navbarLogo.png'
import {Link,useLocation,useNavigate} from 'react-router-dom'
const Navbar = () => {
  let location=useLocation();
  let navigate=useNavigate();

  const handleClick=()=>{
     localStorage.removeItem('token');
     navigate('/login')
  } 

  return (
    <>
        <nav className="navbar navbar-expand-lg  " style={{fontSize:"1.2srem",backgroundColor:'rgb(243 243 243) '}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/about"><img src={NavbarLogo} width='250px'  alt='iNoteBook'/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {/* -----------------------Home and about ------------------- */}
    {localStorage.getItem('token')?<ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/" style={{fontSize:"1.2rem"}}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`}  to="/about" style={{fontSize:"1.2rem"}}>About</Link>
        </li>
      </ul>:<ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about" style={{fontSize:"1.2rem"}}>About</Link>
        </li>
      </ul>}
    
     {/* ---------------Login & Signup-------------- */}
    {localStorage.getItem('token')?<button className='btn btn-danger' onClick={handleClick}>Logout</button>:<form className="d-flex" >
    <Link className="btn btn-success mx-2" to="/login" role="button" style={{fontSize:"1.2rem",padding:'6px 15px 6px 15px'}}>Login</Link>
    <Link className="btn btn-outline-primary" to="/signup" role="button" style={{fontSize:"1.2rem",padding:'6px 15px 6px 15px'}}>Signup</Link>
    </form>}
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar