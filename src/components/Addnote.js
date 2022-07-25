import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = (props) => {
  const context=useContext(noteContext)
  const {addNote}=context
  const [note, setNote] = useState({title:"",description:"",tag:""})

  const onChange=(e)=>{
  // ES6 Object Spread Syntax------- ES6 SpreadOperator-----ES2015 computed property names
  setNote({...note,[e.target.name]:e.target.value}) 
  }                                          
  
  const handleClick=(e)=>{
    e.preventDefault()
     addNote(note.title,note.description,note.tag)
     setNote({title:"",description:"",tag:""})
     props.showAlert('primary','Note has been added')
  }

  return (
    <>
         {/* ----------------------Add a Note------------------- */}
    <div className="container my-4">
    <h2>Add a Note</h2>
    <form className="my-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" value={note.title} onChange={onChange} name="title" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" name="description" id="description" value={note.description} onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onChange}/>
      </div>
      <button disabled={note.title.length<4||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
    </form>
    </div>

    </>
  )
}

export default Addnote