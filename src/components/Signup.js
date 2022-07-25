import React,{useState} from 'react'
import {useNavigate } from 'react-router-dom' //useHistory Hook has been replaced by useNavigate

const Signup = (props) => {
  const host='http://localhost:5000'
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
  const navigate=useNavigate();
  
  const onChange=(e)=>{
  setcredentials({...credentials,[e.target.name]:e.target.value})
  console.log(credentials)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();   
    const {name,email,password}=credentials;
  const response=await fetch(`${host}/api/auth/createuser`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({name,email,password})
        })
   const data=await response.json();
   console.log(data); 
   if(data.success){
       //save the token and redirect
      navigate('/login')
      props.showAlert('success',' You have SignedUp Successfuly')
   } 
   else{
    props.showAlert('danger',' Invalid Credentials')
   }   
  }
  return (
    <>
    <h1 className='mb-4'>SignUp on iNoteBook</h1>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" onChange={onChange} id="name" name='name' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} id="password" name='password' aria-describedby="emailHelp" autoComplete='on' minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="password" onChange={onChange} id="cpassword" autoComplete='on' minLength={5} required/>
        </div>
        <button type="submit"  className="btn btn-primary">SignUp</button>
  </form>
    </>
  )
}

export default Signup