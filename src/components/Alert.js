import React from 'react'

const Alert = (props) => {
  const Manipulate=(type)=>{
    if(type==="danger"){
      return "Error:"
    }
    if(type==="success"){
      return "HURRYYY!"
    }
    if(type==="primary"){
      return "SUCCESS!"
    }
    if(type==="warning"){
      return "SUCCESS!"
    }
  }
  return (
    <>
    <div style={{height:'65px'}}>
       {props.alert &&<div className={`alert alert-${props.alert.type}`} role="alert">
           <strong>{Manipulate(props.alert.type)} </strong>{props.alert.message}
        </div>}
     </div>
    </>
  )
}

export default Alert