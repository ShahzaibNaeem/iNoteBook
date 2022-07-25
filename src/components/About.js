import React from 'react'
import secureImg from '../images/security.png'
import clickImg from '../images/click.png'

const About = () => {

  return (
    <>
     <div className="row featurette">
      <div className="col-md-7 order-md-2">
        <h2 className="featurette-heading fw-normal lh-1">iNoteBook ,<span className="text-muted">Secure your Notes now</span></h2>
        <p className="lead">iNotebook is completely secured.Anybody can signup and can have access to there notes.User Credentials are end to end encrypted.So,there is no need to worry about your private notes</p>
      </div>
      <div className="col-md-5 order-md-1">
        <img src={secureImg} alt="Secure" width='400' height='400'/>
      </div>
    </div>
    <hr className="featurette-divider " style={{margin:"70px 0px 70px 0px"}}></hr>
    <div className="row featurette">
      <div className="col-md-7">
        <h2 className="featurette-heading fw-normal lh-1">User Friendly Interface. <span className="text-muted">iNoteBook</span></h2>
        <p className="lead">iNoteBook is easy to Use. User have to SignUp once. iNoteBook can store Notes on one click. It is particulary designed for storing notes and accessing data at anytime & anywhere</p>
      </div>
      <div className="col-md-5">
      <img src={clickImg} alt="Secure" width='400' height='400'/>
      </div>
    </div>
    </>
  )
}

export default About