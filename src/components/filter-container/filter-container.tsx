import { FC, useState } from 'react';
import { MaleFemaleControl } from './components/male-female-control';
import { BodyAreaSelection } from './components/body-area-selection';


export const FilterContainer: FC = () => {
    const [gender, setGender] = useState('male')
    const bodyAreas = ['test1', 'test2', 'test3']
    const [filteredBodyAreas, setBodyAreas] = useState(bodyAreas)
    return (
        <div className="filter-container">
            <MaleFemaleControl gender={gender} onChange={setGender}/>

            <BodyAreaSelection bodyAreas={bodyAreas} onChange={setBodyAreas}/>
        </div>
    )
}
