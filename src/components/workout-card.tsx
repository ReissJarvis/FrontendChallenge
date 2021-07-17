import { Workout } from '../models';
import React, { FC, Suspense, useCallback } from 'react';
import { CachedImg } from './cached-image';
import { ImageCache } from '../services/image-cache.service';
import { LoadingImage } from './loading-image';

interface WorkoutCardProps {
    workout: Workout
    gender: 'male' | 'female'
    className?: string
    imgCache: ImageCache
    onClick?: (workout: Workout) => void
}

export const WorkoutCard: FC<WorkoutCardProps> = ({ workout, gender, className, imgCache, onClick = () => {}}) => {

    const handleOnClick = useCallback(
        () => {

            onClick(workout)
        },
        [workout, onClick],
    )

    return (
        <div className={`card ${className ? className : ''}`} onClick={handleOnClick}>
            <div className="card-image">
                <figure className="image is-4by3">
                    <Suspense fallback={<LoadingImage />}>
                        <CachedImg src={workout[gender].image} imgCache={imgCache} width="300" alt={workout.name}/>
                    </Suspense>
                </figure>
            </div>
            <div className="card-content card-content-override">
                <h1 className="title is-2-desktop-only is-3-mobile">{workout.name}</h1>
                <div className="tags are-medium">
                    {
                        workout.bodyAreas.map(ba =>
                            <span key={ba} className="tag">{ba}</span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
