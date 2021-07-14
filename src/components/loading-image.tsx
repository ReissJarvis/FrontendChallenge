import React, { FC } from 'react';

export const LoadingImage: FC = () => {
    return (
        <div className="loading-image-container section">
            <progress className="progress is-medium is-dark" max="100"/>
            {/*<div className="columns is-centered">*/}
            {/*    <div className="column is-half">*/}
            {/*        */}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}
