import { FC, useEffect, useState } from 'react';
import { MaleFemaleControl } from './components/male-female-control';
import { BodyAreaSelection } from './components/body-area-selection';
import { MaleFemale } from '../../models';

interface FilterContainerProps {
    bodyAreas: string[]
    onChange: (gender: MaleFemale, bodyAreas: string[]) => void
}

export const FilterContainer: FC<FilterContainerProps> = ({ bodyAreas, onChange}) => {
    const [gender, setGender] = useState<MaleFemale>('male')
    const [filteredBodyAreas, setBodyAreas] = useState(bodyAreas)

    useEffect(() => {
        console.log(gender, filteredBodyAreas)
        onChange(gender, filteredBodyAreas)
    }, [gender, filteredBodyAreas, onChange]);

    useEffect(() => {
        setBodyAreas(bodyAreas)
    }, [bodyAreas]);

    return (
        <div className="filter-container">
            <MaleFemaleControl gender={gender} onChange={setGender}/>

            <BodyAreaSelection bodyAreas={bodyAreas} onChange={setBodyAreas}/>
        </div>
    )
}
