import { render, screen } from '@testing-library/react';
import { MaleFemaleControl, MaleFemaleControlProps } from './components/male-female-control';
import React from 'react';
import { FilterContainer } from './filter-container';
test('Filter Container should should send update filter state on gender change', (done) => {
    const bodyAreas = []

    const onChange = (gender: string, filteredBodyAreas: string[]) => {
        console.log(gender, filteredBodyAreas)
        expect(gender).toBe('male')
        done()
    }

    render(
        <FilterContainer bodyAreas={[]} onChange={onChange}/>
    )

    screen.getByText('Male').click()
})
