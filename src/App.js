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
  const [count, setCount] = useState(1);
  const [noteInput, setNoteInput] = useState('');
  const [notesState,dispatch]=useReducer(notesReducer,initialNotesState);
  const addNote= event =>{
    event.preventDefault();
    if(!noteInput){
      return ;
    }
    const newNote={
      id:count,
      text:noteInput,
      rotate: Math.floor(Math.random()*20)
    }
    dispatch({ type:'ADD_NOTE',payload:newNote})
    setCount(count+1)
  };
  return (
    <div className='app'>
      <h1>Sticky Notes</h1>
      <form onSubmit={addNote} className='note-form'>
        <textarea value={noteInput} onChange={event => setNoteInput(event.target.value)} placeholder='Create a new note...'></textarea>
        <button>Add</button>
      </form>
      {notesState.notes.map(note=>(
        <div className="note" style={{transform: `rotate(${note.rotate}deg)`}}>
          <pre className="text">{note.text}</pre>
        </div>
      ))}
    </div>
  );
}

export default App;
