import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';

export interface BodyAreaSelectionProps {
    bodyAreas: string[]
    onChange: (selectedItems: string[]) => void
}

export const BodyAreaSelection: FC<BodyAreaSelectionProps> = ({ bodyAreas, onChange }) => {
    const [show, setShow] = useState(false);
    const [filteredBodyAreas, setFilteredBodyAreas] = useState(bodyAreas);

    useEffect(() => {
        setFilteredBodyAreas(bodyAreas)
    }, [bodyAreas]);

    useEffect(() => {
        onChange(filteredBodyAreas)
    }, [filteredBodyAreas, onChange]);

    const handleOnClick = useCallback(() => {
        setShow((show) => !show)
    }, [])

    const handleSelectItemOnClick = useCallback((event: MouseEvent<HTMLInputElement>) => {
        const isChecked = event.currentTarget.checked
        const value = event.currentTarget.value

        if (isChecked) {
            setFilteredBodyAreas((fbas) => [...fbas, value])
        } else {
            setFilteredBodyAreas((fbas) => fbas.filter(i => i !== value))
        }

    }, [])

    return (
        <div className="dropdown-container">
            <div className={`dropdown ${ show ? 'is-active' : ''}`}>
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={handleOnClick}>
                        <span>Body Areas</span>
                        <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"/>
                    </span>
                    </button>
                </div>

                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {
                            bodyAreas.map(ba =>
                                <div key={ba} className="dropdown-item">
                                    <label className="checkbox">
                                        <input type="checkbox" value={ba} defaultChecked={true} onClick={handleSelectItemOnClick}/>
                                        {ba}
                                    </label>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
