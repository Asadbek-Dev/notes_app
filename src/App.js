import React, { useState, useReducer } from 'react';

const initialNotesState={
  lastNoteCreated:null,
  totalNotes:0,
  notes:[]
};


const notesReducer=(prevstate,action)=>{
  switch(action.type){
    case 'ADD_NOTE':{
      const newState = {
          lastNoteCreated: new Date().toTimeString().slice(0,8),
          totalNotes:prevstate.notes.length + 1,
          notes:[...prevstate.notes,action.payload]
      };

      console.log('After ADD_NOTE: ',newState);
      return newState;
    }
  }
};

function App() {
  const [noteInput, setNoteInput] = useState('');
  const [notesState,dispatch]=useReducer(notesReducer,initialNotesState)

  const addNote= event =>{
    event.preventDefault();
    if(!noteInput){
      return ;
    }
    const newNote={
      text:noteInput,
    }
    dispatch({ type:'ADD_NOTE',payload:newNote})
  };
  return (
    <div className='app'>
      <h1>Sticky Notes</h1>
      <form onSubmit={addNote} className='note-form'>
        <textarea value={noteInput} onChange={event => setNoteInput(event.target.value)} placeholder='Create a new note...'></textarea>
        <button>Add</button>
      </form>
      {noteInput}
    </div>
  );
}

export default App;
