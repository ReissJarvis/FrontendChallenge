import { FC, useState } from 'react';
import { MaleFemaleControl } from './components/male-female-control';
import { BodyAreaSelection } from './components/body-area-selection';


export const FilterContainer: FC = () => {
    const [gender, setGender] = useState('male')
    const [bodyAreas, setBodyAreas] = useState(['test1', 'test2', 'test3'])
    return (
        <div className="filter-container">
            <MaleFemaleControl gender={gender} onChange={setGender}/>

            <BodyAreaSelection bodyAreas={bodyAreas} onChange={setBodyAreas}/>
        </div>
    )
}
