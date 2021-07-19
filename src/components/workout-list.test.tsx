import { WorkoutList } from './workout-list';
import { Workout } from '../models';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

let container: HTMLElement | null
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
})

afterEach(() => {
    document.body.removeChild(container as Node)
    container = null
})

test('Should render WorkoutList', async () => {
    const workouts: Workout[] = [
        {
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
        },
        {
            id: '2',
            name: 'Workout 2',
            bodyAreas: ['Area 3', 'Area 4'],
            female: {
                image: 'img3'
            },
            male: {
                image: 'img4'
            },
            transcript: ''
        }
    ]

    await act(async () => {
        render(<WorkoutList workouts={workouts}/>, container)
    })

    const cardArray = container?.getElementsByClassName('card')
    expect(cardArray).toHaveLength(2)

    await act(async () => {
        const firstBodyAreaListItemCheckbox = container?.getElementsByTagName('input').item(0) as HTMLButtonElement
        const secondBodyAreaListItemCheckbox = container?.getElementsByTagName('input').item(1) as HTMLButtonElement
        firstBodyAreaListItemCheckbox.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        secondBodyAreaListItemCheckbox.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })

    const updatedCardArray = container?.getElementsByClassName('card')
    console.log(container?.getElementsByClassName('card'))
    expect(updatedCardArray).toHaveLength(1)
})

