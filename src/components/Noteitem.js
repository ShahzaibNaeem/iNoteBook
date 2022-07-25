import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
const Noteitem = (props) => {
   const context=useContext(noteContext);
   const {deleteNote}=context;
   // ----------Getting Props--------
   const {title,description,_id}=props.note
   const {note}=props
   const {updateNote}=props
  return (
    <>
     <div className="card col-sm-3 mx-3 my-3">
        <div className="card-body">
        <div className="d-flex">
           <h5 className="card-title">{title}</h5>
           <div className='position-absolute top-0 end-0'>
           {/* ------------Delete Icon---------- */}
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(_id);props.showAlert('warning','Note has been deleted')}}></i>
            {/* --------------Edit Icon------------- */}
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
           </div>
            
        </div>
            <p className="card-text">{description}</p>
        </div>
    </div>
    </>
  )
}

export default Noteitem