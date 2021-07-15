import { render, screen } from '@testing-library/react';
import React from 'react';

import { WorkoutCard } from './workout-card';
import { Workout } from '../models';
import { ImageCache } from '../services/image-cache.service';

jest.mock('../services/image-cache.service')

const imageCacheMock = new ImageCache()

test('renders workoutCard', () => {
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
        <WorkoutCard workout={workout} gender='female' imgCache={imageCacheMock}/>
    )

    const workoutName = screen.getByText(workout.name)
    expect(workoutName).toBeInTheDocument()

    const bodyAreas = container.getElementsByClassName('tags').item(0)
    expect(bodyAreas?.children.length).toBe(2)

    const img = container.getElementsByTagName('img').item(0)
    expect(img?.src).toBe(`http://localhost/${workout.female.image}`)
})

test('renders WorkoutCard with Male image if male gender selected', () => {
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
        <WorkoutCard workout={workout} gender='male' imgCache={imageCacheMock}/>
    )

    const img = container.getElementsByTagName('img').item(0)
    expect(img?.src).toBe(`http://localhost/${workout.male.image}`)
})
