import { FC, useCallback, useEffect, useState } from 'react';
import { MaleFemaleControl, BodyAreaSelection } from './components';
import { Gender } from '../../models';

interface FilterContainerProps {
    bodyAreas: string[]
    className?: string
    onChange: (gender: Gender, bodyAreas: string[]) => void
}

export const FilterContainer: FC<FilterContainerProps> = ({ bodyAreas, className, onChange}) => {
    const [gender, setGender] = useState<Gender>('male')
    const [filteredBodyAreas, setFilteredBodyAreas] = useState<string[]>(bodyAreas)

    useEffect(() => {
        setFilteredBodyAreas(bodyAreas)
    }, [bodyAreas]);

    const handleGenderChange = useCallback(
        (gender: Gender) => {
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
            <BodyAreaSelection bodyAreas={bodyAreas} onChange={handleBodyAreaChange}/>
        </div>
    )
}
