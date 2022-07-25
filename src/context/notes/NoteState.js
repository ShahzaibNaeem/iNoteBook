import noteContext from "./noteContext";
import React,{useState} from 'react'


const NoteState=(props)=>{
     const host='http://localhost:5000'

    const notesInitial=[]

//  -------------------Get All Notes--------------
 const getNotes=async ()=>{
  // API Call
  const response=await fetch(`${host}/api/notes/fetchallnotes`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'auth-token' :localStorage.getItem('token')
    }
  })
  const data= await response.json()
  // Making changes on the client side
  setNotes(data)
  }

  // ---------------------Add a Note---------------------
   const addNote=async (title,description,tag)=>{
    // API Call
    const response=await fetch(`${host}/api/notes/addnote`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token' :localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    })
    const data= await response.json()
    // Making Changes on Client Side
    setNotes(notes.concat(data));
   }

    // ----------------Delete a Note-----------
    const deleteNote=async(id)=>{
      // API Call
      const response= await fetch(`${host}/api/notes/deletenote${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'auth-token' :localStorage.getItem('token')
        }
      })
      let newNotes=notes.filter((element)=>{return element._id!==id});
      setNotes(newNotes)
      console.log(response)
    }

    // ---------------Edit a Note-----------
    const editNote=async(id,title,description,tag)=>{
      // API Call
      const response= await fetch(`${host}/api/notes/updatenote${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'auth-token' :localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      })
      const data= await response.json()
      console.log(data)
      // Making Changes on Client Side
      let newNotes= JSON.parse(JSON.stringify(notes))          //We can't update state directly in React thats-
      for (let index = 0; index < newNotes.length; index++) {  //why we are storing notes in another variable then
        if(newNotes[index]._id===id){                          //updating the value
          newNotes[index].title=title
          newNotes[index].description=description
          newNotes[index].tag=tag
          break;
        } 
      }
      setNotes(newNotes);
    }

    const [notes,setNotes]=useState(notesInitial)
  return (
    <noteContext.Provider value={{notes,getNotes,addNote,deleteNote,editNote}}>
     {props.children}
    </noteContext.Provider>
  )
}

export default NoteState