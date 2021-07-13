import { render, screen } from '@testing-library/react'
import React from 'react'
import { BodyAreaSelection } from './body-area-selection'

test('BodyAreaSelection should display body area items', () => {
    const bodyAreas = ['area 1', 'area 2', 'area 3']

    const { container } = render(
        <BodyAreaSelection bodyAreas={bodyAreas} onChange={() => {}}/>
    )

    const dropDownContent = container.getElementsByClassName('dropdown-content')
    expect(dropDownContent.length).toBe(1)

    const dropDownItems = dropDownContent.item(0)?.children

    expect(dropDownItems?.length).toBe(bodyAreas.length)
})

test('BodyAreaSelection should display list items if selection trigger has been clicked', () => {
    const bodyAreas = ['area 1', 'area 2', 'area 3']

    const { container } = render(
        <BodyAreaSelection bodyAreas={bodyAreas} onChange={ () => {} }/>
    )

    const bodyAreaSelectionTrigger = screen.getByText('Body Areas')
    bodyAreaSelectionTrigger.click()

    const dropDown = container.getElementsByClassName('dropdown').item(0)

    expect(dropDown?.className).toContain('is-active')
})
