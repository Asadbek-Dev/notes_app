import React, { useState, useReducer } from 'react';

const initialNotesState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: []
};

const notesReducer = (prevstate, action) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
        totalNotes: prevstate.notes.length + 1,
        notes: [...prevstate.notes, action.payload]
      };

      console.log('After ADD_NOTE: ', newState);
      return newState;
    }
  }
};
function App() {
  const [count, setCount] = useState(1);
  const [noteInput, setNoteInput] = useState('');
  const [notesState, dispatch] = useReducer(notesReducer, initialNotesState);
  const addNote = event => {
    event.preventDefault();
    if (!noteInput) {
      return;
    }
    const newNote = {
      id: count,
      text: noteInput,
      rotate: Math.floor(Math.random() * 20)
    }
    dispatch({ type: 'ADD_NOTE', payload: newNote })
    setCount(count + 1)
  };
  return (
    <div className='app'>
      <h1>Sticky Notes</h1>
      <form onSubmit={addNote} className='note-form'>
        <textarea value={noteInput} onChange={event => setNoteInput(event.target.value)} placeholder='Create a new note...'></textarea>
        <button>Add</button>
      </form>
      {notesState.notes.map(note => (
        <div className="note" style={{ transform: `rotate(${note.rotate}deg)` }}>
          <div onClick={() => dispatch({ type: 'DELETE_NOTE', payload: note })}
            className="close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <pre className="text">{note.text}</pre>
        </div>
      ))}
    </div>
  );
}

export default App;
