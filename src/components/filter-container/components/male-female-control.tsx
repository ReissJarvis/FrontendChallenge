import { FC, MouseEvent, useCallback } from 'react';
import { Gender } from '../../../models';

export interface MaleFemaleControlProps {
    gender?: string
    onChange: (gender: Gender) => void
}

export const MaleFemaleControl: FC<MaleFemaleControlProps> = ({ gender, onChange }) => {

    const handleOnClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const buttonValue = event.currentTarget.value
        onChange(buttonValue as Gender)
    }, [onChange])

    return (
        <div className="buttons has-addons">
            <button className={`button is-flex is-justify-content-center ${ gender === 'male' ? 'is-selected is-dark' : 'is-light'}`} value="male" onClick={handleOnClick}>
                <span className="icon is-small">
                    <i className="fas fa-male" aria-hidden="true"/>
                </span>
                <span className="is-hidden-mobile">Male</span>
            </button>
            <button className={`button is-flex is-justify-content-center ${ gender === 'female' ? 'is-selected is-dark' : 'is-light'}`} value="female" onClick={handleOnClick}>
                <span className="icon is-small">
                    <i className="fas fa-female" aria-hidden="true"/>
                </span>
                <span className="is-hidden-mobile">Female</span>
            </button>
        </div>
    )
}
