import React, { FC, useCallback, useEffect, useState } from 'react';
import { FilterContainer } from './filter-container';
import { WorkoutCard } from './workout-card';
import { ImageCache } from '../services';
import { MaleFemale, Workout } from '../models';
import { WorkoutModal } from './workout-modal';

export interface WorkoutListProps {
    imgCache?: ImageCache
    workouts: Workout[]
}

export const WorkoutList: FC<WorkoutListProps> = ({workouts, imgCache}) => {
    const [bodyAreas, setBodyAreas] = useState<string[]>([])
    const [filteredBodyAreas, setFilteredBodyAreas] = useState<string[]>([])
    const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>(workouts)
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>(undefined)
    const [gender, setGender] = useState<MaleFemale>('male')

    useEffect(() => {
        const bodyAreas = workouts
            .reduce((bodyAreas: string[], wo) => [
                ...bodyAreas, ...wo.bodyAreas
            ], [])
            .filter((bodyArea, index, self) => self.indexOf(bodyArea) === index)

        setFilteredWorkouts(workouts)
        setBodyAreas(bodyAreas)
    }, [workouts, setFilteredWorkouts]);

    useEffect(() => {
        const filteredWorkouts = workouts
            .filter(wo =>
                wo.bodyAreas.find(ba => filteredBodyAreas.includes(ba))
            )
        setFilteredWorkouts(filteredWorkouts)
    }, [filteredBodyAreas, setFilteredWorkouts, workouts]);

    const handleWorkoutSelected = useCallback((workout?: Workout) => {
        setSelectedWorkout(workout)
    },[]);

    const handleFilterChange = useCallback(
        (gender: MaleFemale, bodyAreas: string[]) => {
            setGender(gender)
            setFilteredBodyAreas(bodyAreas)
        },
        [setGender, setFilteredBodyAreas],
    );

    return (
        <>
            <FilterContainer bodyAreas={bodyAreas} onChange={handleFilterChange}/>
            <div className="workout-card-container scroll-container">
                {
                    filteredWorkouts
                        .map(wo =>
                            <WorkoutCard key={wo.id}
                                         workout={wo}
                                         gender={gender}
                                         className="card-list-max-width"
                                         imgCache={imgCache}
                                         onClick={setSelectedWorkout}/>
                        )
                }
            </div>
            {
                selectedWorkout && <WorkoutModal
                  workout={selectedWorkout}
                  imgCache={imgCache}
                  gender={gender}
                  onClose={handleWorkoutSelected}
                />
            }
        </>
    )
}
