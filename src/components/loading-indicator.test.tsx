import { render } from "react-dom";
import React from 'react';
import { act } from 'react-dom/test-utils';

import { LoadingIndicator } from './loading-indicator';

let container: HTMLElement | null
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
})

afterEach(() => {
    document.body.removeChild(container as Node);
    container = null;
})

test('LoadingIndicator updates message after interval', () => {

    jest.useFakeTimers();

    act(() => {
        render(
            <LoadingIndicator/>,
            container
        )
    });

    const previousMessage = container?.getElementsByClassName('loading-message').item(0)?.textContent

    act(() => {
        jest.advanceTimersByTime(3000)
    })

    const currentMessage = container?.getElementsByClassName('loading-message').item(0)?.textContent
    expect(currentMessage).not.toBe(previousMessage)
})

test('LoadingIndicator updates message after interval should cleanup on dismount', () => {

    jest.useFakeTimers()

    act(() => {
        render(
            <LoadingIndicator/>,
            container
        )
    })

    act(() => {
        jest.advanceTimersByTime(3000)
    })

    act(() => {
        render(<></>, container)
    })

    act(() => {
        jest.advanceTimersByTime(3000)
    })

    expect(setInterval).toHaveBeenCalledTimes(1)
})
