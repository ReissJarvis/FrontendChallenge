import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { FilterContainer } from './components/filter-container/filter-container';
import { WorkoutCard } from './components/workout-card';
import { WorkoutApiService } from './services/workout-api.service';
import { Workout } from './models/workout.model';


const workoutApiService = new WorkoutApiService()

function App() {

    const [workouts, setWorkouts] = useState<Workout[]>([])
    useEffect(() => {
        workoutApiService.get()
            .then(fetchedWorkouts => setWorkouts(fetchedWorkouts.exercises))
    }, []);

  return (
   <div className="app-container">
     <div className="title-bar">
       <h1 className="title is-1">Workout.</h1>
     </div>
     <div className="content-container">
         <FilterContainer/>

         <div className="workout-card-container">

             {
                 workouts.map(wo =>
                     <WorkoutCard workout={wo} gender="female"/>
                 )
             }
         </div>

     </div>
   </div>
  );
}

export default App;
