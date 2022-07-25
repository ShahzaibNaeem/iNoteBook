import React from 'react'
import Notes from './Notes'
const Home = (props) => {
   const {showAlert}=props
  return (
    <>
    {/* -------All Notes Related components on Homepage ------  */}
    <Notes showAlert={showAlert}/>
    </>
  )
}

export default Home