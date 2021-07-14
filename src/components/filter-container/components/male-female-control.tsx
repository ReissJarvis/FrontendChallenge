import { FC, MouseEvent, useCallback } from 'react';
import { MaleFemale } from '../../../models';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import faUserPlus from '@fortawesome/fontawesome-free/';
interface MaleFemaleControl {
    gender?: string
    onChange: (gender: MaleFemale) => void
}

export const MaleFemaleControl: FC<MaleFemaleControl> = ({ gender, onChange }) => {

    const handleOnClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const buttonValue = event.currentTarget.value
        onChange(buttonValue as MaleFemale)
    }, [onChange])

    return (
        <div className="buttons has-addons">
            <button className={`button ${ gender === 'male' ? 'is-selected is-dark' : 'is-light'}`} value="male" onClick={handleOnClick}>
                <span className="icon is-small">
                    <i className="fas fa-male" aria-hidden="true"/>
                </span>
                <span>Male</span>
            </button>
            <button className={`button ${ gender === 'female' ? 'is-selected is-dark' : 'is-light'}`} value="female" onClick={handleOnClick}>
                <span className="icon is-small">
                    <i className="fas fa-female" aria-hidden="true"/>
                </span>
                <span>Female</span>
            </button>
        </div>
    )
}
