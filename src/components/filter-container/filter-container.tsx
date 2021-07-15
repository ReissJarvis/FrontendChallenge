import { FC, useCallback, useEffect, useState } from 'react';
import { MaleFemaleControl } from './components/male-female-control';
import { BodyAreaSelection } from './components/body-area-selection';
import { MaleFemale } from '../../models';

interface FilterContainerProps {
    bodyAreas: string[]
    className?: string
    onChange: (gender: MaleFemale, bodyAreas: string[]) => void
}

export const FilterContainer: FC<FilterContainerProps> = ({ bodyAreas, className, onChange}) => {
    const [gender, setGender] = useState<MaleFemale>('male')
    const [filteredBodyAreas, setFilteredBodyAreas] = useState<string[]>(bodyAreas)

    useEffect(() => {
        setFilteredBodyAreas(bodyAreas)
    }, [bodyAreas]);

    const handleGenderChange = useCallback(
        (gender: MaleFemale) => {
            setGender(gender)
            onChange(gender, filteredBodyAreas)
        },
        [filteredBodyAreas, onChange],
    )

    const handleBodyAreaChange = useCallback(
        (filteredBodyAreas: string[]) => {
            setFilteredBodyAreas(filteredBodyAreas)
            onChange(gender, filteredBodyAreas)
        },
        [gender, onChange],
    )

    return (
        <div className={`filter-container ${className || ''}`}>
            <MaleFemaleControl gender={gender} onChange={handleGenderChange}/>

            <div>
                <BodyAreaSelection bodyAreas={bodyAreas} onChange={handleBodyAreaChange}/>
            </div>
        </div>
    )
}
