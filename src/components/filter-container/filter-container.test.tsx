import { render, screen } from '@testing-library/react';
import React from 'react';
import { FilterContainer } from './filter-container';

test('Filter Container should should send update filter state on gender change', (done) => {
    const onChange = (gender: string) => {
        expect(gender).toBe('male')
        done()
    }

    render(
        <FilterContainer bodyAreas={[]} onChange={onChange}/>
    )

    screen.getByText('Male').click()
})

test('Filter Container should should send current bodyArea array on update', (done) => {
    const bodyAreas = ['item-one', 'item-two']

    const onChange = (gender: string, filteredBodyAreas: string[]) => {
        expect(filteredBodyAreas).toHaveLength(2)
        done()
    }

    render(
        <FilterContainer bodyAreas={bodyAreas} onChange={onChange}/>
    )

    screen.getByText('Male').click()
})
