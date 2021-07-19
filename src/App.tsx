import {  useEffect, useState } from 'react';

import { WorkoutApiService, ImageCache } from './services';
import { LoadingIndicator, WorkoutList } from './components';
import { Workout } from './models';

const workoutApiService = new WorkoutApiService()

// Improvement: Provide this in a context element instead of passing it down the prop chain and then check if its on the context
// if it is we use the cache, if not we ignore it on img elements
const imgCache = new ImageCache()

function App(): JSX.Element {
    const [workouts, setWorkouts] = useState<Workout[]>([])

    const [loading, setLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)


    useEffect(() => {
        setLoading(true)
        workoutApiService.get()
            .then(fetchedWorkouts => {
                setLoading(false)
                setWorkouts(fetchedWorkouts.exercises)
            })
            .catch(() => {
                setLoading(false)
                setIsError(true)
            })
    }, []);

  return (
    <div className="app-container">
        <div className="section">
            <h1 className="title is-1 is-page-title">Workout.</h1>
        </div>

        <div className="section content-section-override">
            { loading && <LoadingIndicator/>}

            {
                !loading && isError && <div>
                    <div className="icon">
                        <i className="fas fa-sad-tear" aria-hidden="true"/>
                    </div>
                    Error Occurred fetching workouts
                </div>
            }

            {
                !loading && !isError && <WorkoutList workouts={workouts} imgCache={imgCache}/>
            }
       </div>
    </div>
  );
}

export default App;
