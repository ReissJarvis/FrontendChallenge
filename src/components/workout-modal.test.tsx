import { render, screen } from '@testing-library/react';
import React from 'react';

import { Workout } from '../models';
import { WorkoutModal } from './workout-modal';

test('renders WorkoutModal', () => {
    const workout: Workout = {
        id: '1',
        name: 'Workout 1',
        bodyAreas: ['Area 1', 'Area 2'],
        female: {
            image: 'img1'
        },
        male: {
            image: 'img2'
        },
        transcript: ''
    }

    const {container} = render(
        <WorkoutModal workout={workout} gender='female'/>
    )

    const workoutName = screen.getByText(workout.name)
    expect(workoutName).toBeInTheDocument()

    const bodyAreas = container.getElementsByClassName('tags').item(0)
    expect(bodyAreas?.children.length).toBe(2)

    const img = container.getElementsByTagName('img').item(0)
    expect(img?.src).toBe(`http://localhost/${workout.female.image}`)
})

test('WorkoutModal Calls Close on button click', (done) => {
    const workout: Workout = {
        id: '1',
        name: 'Workout 1',
        bodyAreas: ['Area 1', 'Area 2'],
        female: {
            image: 'img1'
        },
        male: {
            image: 'img2'
        },
        transcript: ''
    }

    function handleOnClose() {
        //we just want an empty assertion here
        expect(true).toBe(true)
        done()
    }

    const {container} = render(
        <WorkoutModal workout={workout} gender='male' onClose={handleOnClose}/>
    )

    const closeButton = container.getElementsByClassName('modal-close').item(0)

    const mouseEvent = new MouseEvent("click", {bubbles: true})
    closeButton?.dispatchEvent(mouseEvent)
})
