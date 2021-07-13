import React from 'react';
import { render, screen } from '@testing-library/react';
import { MaleFemaleControl } from './male-female-control';

test('MaleFemaleControl should fire "male" string on click', (done) => {
    const onChangeEventHandler = (gender: string) => {
        expect(gender).toBe('male')
        done()
    }

    render(
        <MaleFemaleControl onChange={onChangeEventHandler}/>
    )

    screen.getByText('Male').click()
})

test('MaleFemaleControl should fire "female" string on click', (done) => {
    const onChangeEventHandler = (gender: string) => {
        expect(gender).toBe('female')
        done()
    }

    render(
        <MaleFemaleControl onChange={onChangeEventHandler}/>
    )

    screen.getByText('Female').click()
})

test('MaleFemaleControl should disable Male button if gender is male', () => {
    render(
        <MaleFemaleControl gender="male" onChange={() => {}}/>
    )

    const buttonElement = screen.getByText('Male').parentElement

    expect(buttonElement).not.toBeNull()

    expect(buttonElement?.classList.contains('is-dark')).toBeTruthy()
})

test('MaleFemaleControl should disable Female button if gender is female', () => {
    render(
        <MaleFemaleControl gender="female" onChange={() => {}}/>
    )

    const buttonElement = screen.getByText('Female').parentElement

    expect(buttonElement).not.toBeNull()

    expect(buttonElement?.classList.contains('is-dark')).toBeTruthy()
})
