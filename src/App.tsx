import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { FilterContainer } from './components/filter-container/filter-container';
import { WorkoutCard } from './components/workout-card';
import { WorkoutApiService } from './services/workout-api.service';
import { Workout } from './models/workout.model';
import { LoadingIndicator } from './components/loading-indicator';
import { MaleFemale } from './models';


const workoutApiService = new WorkoutApiService()

function App() {

    const [workouts, setWorkouts] = useState<Workout[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [bodyAreas, setBodyAreas] = useState<string[]>([])
    const [gender, setGender] = useState<'male' | 'female'>('male')

    useEffect(() => {
        setLoading(true)
        workoutApiService.get()
            .then(fetchedWorkouts => {

                const bodyAreas = fetchedWorkouts.exercises
                    .reduce((bodyAreas: string[], wo) => [
                        ...bodyAreas, ...wo.bodyAreas
                    ], [])
                    .filter((bodyArea, index, self) => self.indexOf(bodyArea) === index)

                setLoading(false)
                setWorkouts(fetchedWorkouts.exercises)
                setBodyAreas(bodyAreas)
            })
            .catch(err => {
                setLoading(true)
                setIsError(true)
            })
    }, []);

    const handleFilterChange = useCallback(
        (gender: MaleFemale, bodyAreas: string[]) => {
            setGender(gender)
            setBodyAreas(bodyAreas)
        },
        [setGender, setBodyAreas],
    );


  return (
   <div className="app-container">
     <div className="title-bar">
       <h1 className="title is-1">Workout.</h1>
     </div>
     <div className="content-container">
         <FilterContainer bodyAreas={bodyAreas} onChange={handleFilterChange}/>

         <div className="workout-card-container">

             { loading && <LoadingIndicator/>}
             { !loading && isError && <div>
               <div className="icon is-large">
                 <i className="fas fa-sad-tear" aria-hidden="true"/>
               </div>
               Error Occurred fetching workouts
             </div>}
             {
                 !loading && !isError && workouts.map(wo =>
                     <WorkoutCard key={wo.id} workout={wo} gender={gender} className="card-list-max-width"/>
                 )
             }
         </div>

     </div>
   </div>
  );
}

export default App;
