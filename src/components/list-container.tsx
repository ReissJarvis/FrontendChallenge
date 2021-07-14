import { FC } from 'react';

interface ListContainerProps {
}

export const ListContainer: FC<ListContainerProps> = ({children}) => {
    return (
        <div className="tile is-ancestor">
            {children}
        </div>
    )
}
