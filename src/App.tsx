import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.scss';
import { FilterContainer } from './components/filter-container/filter-container';
import { WorkoutCard } from './components/workout-card';
import { WorkoutApiService } from './services/workout-api.service';
import { LoadingIndicator } from './components/loading-indicator';
import { MaleFemale, Workout } from './models';
import { ImageCache } from './services/image-cache.service';

const workoutApiService = new WorkoutApiService()

function App() {
    const [workouts, setWorkouts] = useState<Workout[]>([])
    const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [bodyAreas, setBodyAreas] = useState<string[]>([])
    const [filteredBodyAreas, setFilteredBodyAreas] = useState<string[]>([])
    const [gender, setGender] = useState<'male' | 'female'>('male')

    const imgCache = new ImageCache()

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
                setFilteredBodyAreas(bodyAreas)
            })
            .catch(err => {
                setLoading(true)
                setIsError(true)
            })
    }, []);

    const handleFilterChange = useCallback(
        (gender: MaleFemale, bodyAreas: string[]) => {
            setGender(gender)
            setFilteredBodyAreas(bodyAreas)
        },
        [setGender, setFilteredBodyAreas],
    );

    useEffect(() => {
        const filteredWorkouts = workouts
            .filter(wo =>
                wo.bodyAreas.find(ba => filteredBodyAreas.includes(ba))
            )
        setFilteredWorkouts(filteredWorkouts)
    }, [filteredBodyAreas, setFilteredWorkouts, workouts]);

    useEffect(() => {
        setFilteredWorkouts(workouts)
    }, [workouts, setFilteredWorkouts]);

  return (
   <div className="app-container">
     <div className="section">
       <h1 className="title is-1 is-page-title">Workout.</h1>
     </div>
     <div className="section content-section-override">
         <FilterContainer bodyAreas={bodyAreas} onChange={handleFilterChange}/>
             <div className="workout-card-container">

                 { loading && <LoadingIndicator/>}
                 { !loading && isError && <div>
                   <div className="icon">
                     <i className="fas fa-sad-tear" aria-hidden="true"/>
                   </div>
                   Error Occurred fetching workouts
                 </div>}
                 {
                     !loading && !isError && filteredWorkouts.map(wo =>
                         <WorkoutCard key={wo.id}
                                      workout={wo}
                                      gender={gender}
                                      className="card-list-max-width"
                                      imgCache={imgCache}/>
                     )
                 }
             </div>
     </div>
   </div>
  );
}

export default App;
