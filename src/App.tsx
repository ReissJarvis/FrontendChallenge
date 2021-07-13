import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { FilterContainer } from './components/filter-container/filter-container';

function App() {
  return (
   <div className="app-container">
     <div className="title-bar">
       <h1 className="title is-1">Workout.</h1>
     </div>
     <div className="content-container">
         <FilterContainer/>

       <div className="card">
         <div className="workout-image">
           <img/>
         </div>
         <div className="title">
            Armbar
         </div>
       </div>
     </div>
   </div>
  );
}

export default App;
