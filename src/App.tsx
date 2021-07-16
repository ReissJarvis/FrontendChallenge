import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { FilterContainer } from './components/filter-container/filter-container';
import { WorkoutCard } from './components/workout-card';
import { WorkoutApiService } from './services/workout-api.service';
import { LoadingIndicator } from './components/loading-indicator';
import { MaleFemale, Workout } from './models';
import { ImageCache } from './services/image-cache.service';
import { WorkoutModal } from './components/workout-modal';

const workoutApiService = new WorkoutApiService()
const imgCache = new ImageCache()

function App() {
    const [workouts, setWorkouts] = useState<Workout[]>([])
    const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [bodyAreas, setBodyAreas] = useState<string[]>([])
    const [filteredBodyAreas, setFilteredBodyAreas] = useState<string[]>([])
    const [gender, setGender] = useState<MaleFemale>('male')
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>(undefined)

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

    const handleWorkoutSelected = useCallback((workout?: Workout) => {
        console.log("selected workout", workout)
        setSelectedWorkout(workout)
    },[]);

  return (
    <div className="app-container">
     <div className="section">
       <h1 className="title is-1 is-page-title">Workout.</h1>
     </div>

     <div className="section content-section-override">
         <FilterContainer bodyAreas={bodyAreas} onChange={handleFilterChange}/>
             <div className="workout-card-container scroll-container">
                 { loading && <LoadingIndicator/>}
                 { !loading && isError && <div>
                       <div className="icon">
                         <i className="fas fa-sad-tear" aria-hidden="true"/>
                       </div>
                       Error Occurred fetching workouts
                    </div>
                 }
                 {
                     !loading && !isError && filteredWorkouts.map(wo =>
                         <WorkoutCard key={wo.id}
                                      workout={wo}
                                      gender={gender}
                                      className="card-list-max-width"
                                      imgCache={imgCache}
                                      onClick={handleWorkoutSelected}/>
                     )
                 }

         </div>
    </div>
        {
            selectedWorkout && <WorkoutModal
              workout={selectedWorkout}
              imgCache={imgCache}
              gender={gender}
              onClose={handleWorkoutSelected}
            />
        }
   </div>
  );
}

export default App;
