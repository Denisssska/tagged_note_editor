import React from 'react';
import './App.scss';
import {NotesList} from "./features/NotesList/NotesList";


function App() {
    return (
    <div className="container">
      <NotesList/>
    </div>
  );
}

export default App;
