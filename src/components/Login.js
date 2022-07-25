import React,{useState} from 'react'
import {useNavigate } from 'react-router-dom' //useHistory Hook has been replaced by useNavigate
const Login = (props) => {
    const host='http://localhost:5000';
    const [credentials, setcredentials] = useState({email:"",password:""})
    const navigate=useNavigate();
    
    const onChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();   
    const response=await fetch(`${host}/api/auth/login`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          })
     const data=await response.json();
     if(data.success){
       //save the token and redirect
       localStorage.setItem('token',data.authToken)
       navigate('/')
       props.showAlert('success',' You have Logged in Successfully')
     } 
     else{
      props.showAlert('danger',' Invalid Credentials')
     }   
    }

  return (
    <>
    <h1 className='mb-4'>Login on iNoteBook</h1>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={onChange} id="password" autoComplete='on'/>
        </div>
        <button type="submit"  className="btn btn-primary">Submit</button>
  </form>
    </>
  )
}

export default Login