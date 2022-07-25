import React ,{ useContext,useEffect,useRef ,useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context=useContext(noteContext);
  const navigate=useNavigate()
  const{notes,getNotes,editNote}=context;
  const {showAlert}=props
   
    useEffect(() => {
      if(localStorage.getItem('token')){
      getNotes()
      }
      else{
       navigate('/login')
      }
      // eslint-disable-next-line
    }, [])
const ref=useRef(null)
const refClose=useRef(null)
const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

const updateNote=(note)=>{
  ref.current.click()
  setNote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag})
}
const onChange=(e)=>{
  // ES6 Object Spread Syntax------- ES6 SpreadOperator-----ES2015 computed property names
  setNote({...note,[e.target.name]:e.target.value}) 
  }                                          
  
const handleClick=(e)=>{
    e.preventDefault()
    refClose.current.click()
    editNote(note.id,note.etitle,note.edescription,note.etag)
    showAlert('primary','Note has been Updated')
  }
    
  return (
    <>
    {/* -----------------------------Add Note------------------- */}
    <Addnote showAlert={showAlert}/>

    {/* --------------------------------Modal----------------------- */}
 
    <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          {/* //Form Start */}
          <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">Title</label>
            <input type="text" className="form-control" value={note.etitle} id="etitle" onChange={onChange} name="etitle" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">Description</label>
            <input type="text" className="form-control" value={note.edescription} name="edescription" id="edescription" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">Tag</label>
            <input type="text" className="form-control" value={note.etag} name="etag" id="etag" onChange={onChange}/>
          </div>
        </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary"ref={refClose} data-bs-dismiss="modal">Close</button>
            <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} className="btn btn-primary"  onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>

    {/* -----------------------------Your Notes---------------------- */}
    <h2>Your Notes</h2>
    {notes.length===0 && <div className='container'>No Notes to show</div>}
    <div className="row my-3 ">
     {notes.map((element)=>{
        return <Noteitem note={element} updateNote={updateNote} showAlert={showAlert} key={element._id} />
        })}
    </div>
    </>
  )}

export default Notes