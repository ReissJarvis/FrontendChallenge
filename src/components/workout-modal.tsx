import React, { FC, Fragment, Suspense, useCallback } from 'react';
import { MaleFemale, Workout } from '../models';
import { LoadingImage } from './loading-image';
import { CachedImg } from './cached-image';
import { ImageCache } from '../services/image-cache.service';
import parse from 'html-react-parser'

interface WorkoutModalProps {
    workout: Workout
    gender: MaleFemale
    imgCache?: ImageCache
    onClose?: () => void
}

export const WorkoutModal: FC<WorkoutModalProps> = ({workout, gender, imgCache, onClose}) => {

    const handleOnClick = useCallback(() => {
        if (onClose) {
            onClose()
        }

    }, [onClose])

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={handleOnClick}/>
            <div className="modal-content box">
                <div className="columns">
                    <div className="column">
                        <figure className="image is-4by3">
                            <Suspense fallback={<LoadingImage/>}>
                                <CachedImg src={workout[gender].image} imgCache={imgCache} width="300"
                                           alt={workout.name}/>
                            </Suspense>
                        </figure>
                    </div>
                    <div className="column">
                        <h1 className="title is-2-desktop-only is-3-mobile">{workout.name}</h1>
                        <div className="tags are-medium">
                            {
                                workout.bodyAreas.map(ba =>
                                    <span key={ba} className="tag">{ba}</span>
                                )
                            }
                        </div>
                        <div className="content instructions-override">
                            {/*
                                Ive used a package here to parse the HTML instead of using dangerouslySetInnerHTML

                                this package also supports overriding elements to custom react components
                            */}
                            {parse(workout.transcript)}
                        </div>
                    </div>
                </div>

                <button className="modal-close is-large" aria-label="close" onClick={handleOnClick}/>
            </div>
        </div>
    )
}
