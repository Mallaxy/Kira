import React from 'react';
import {ResultsItem} from "./ResultItem/ResultsItem";

export const ResultsBlock = ({data}) => {

    return (
        <div>
            {data.map(el => <ResultsItem props={el} key={el.id}/>)}
        </div>
    );
}
