import { render } from '@testing-library/react';
import { ListContainer } from './list-container';
import React from 'react';

test('renders ListContainer', () => {
    const { container } = render(
        <ListContainer>
            <div className="item">item 1</div>
            <div className="item">item 2</div>
            <div className="item">item 3</div>
        </ListContainer>
    )

    const listContainerElement = container.getElementsByClassName('tile')
    expect(listContainerElement.length).toBe(1)

    const containerItems = listContainerElement[0]?.getElementsByClassName('item')

    expect(containerItems !== undefined).toBe(true)
    expect(containerItems?.length).toBe(3)
})
