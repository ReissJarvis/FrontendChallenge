import { Workout } from '../models/workout.model';
import { FC } from 'react';

interface WorkoutCardProps {
    workout: Workout
    gender: 'male' | 'female'
}

export const WorkoutCard: FC<WorkoutCardProps> = ({ workout, gender}) => {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={workout[gender].image} width="400" alt={workout.name}/>
                </figure>
            </div>
            <div className="card-content">
                <h1 className="title is-2-desktop-only is-3-mobile">{workout.name}</h1>
                <div className="tags are-medium">
                    {
                        workout.bodyAreas.map(ba =>
                            <span className="tag">{ba}</span>
                        )
                    }
                </div>

            </div>
        </div>
    )
}
