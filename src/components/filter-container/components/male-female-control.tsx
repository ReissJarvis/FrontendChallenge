import { FC, MouseEvent, useCallback } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface MaleFemaleControl {
    gender?: string
    onChange: (gender: string) => void
}

export const MaleFemaleControl: FC<MaleFemaleControl> = ({ gender, onChange }) => {

    const handleOnClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        const buttonValue = event.currentTarget.value
        onChange(buttonValue)
    }, [onChange])

    return (
        <div className="buttons has-addons">
            <button className={`button ${ gender === 'male' ? 'is-selected is-dark' : 'is-light'}`} value="male" onClick={handleOnClick}>
                <span className="icon is-small">
                    {/*<FontAwesomeIcon icon="male"/>*/}
                </span>
                <span>Male</span>
            </button>
            <button className={`button ${ gender === 'female' ? 'is-selected is-dark' : 'is-light'}`} value="female" onClick={handleOnClick}>
                <span className="icon is-small">
                    {/*<FontAwesomeIcon icon="female"/>*/}
                </span>
                <span>Female</span>
            </button>
        </div>
    )
}
