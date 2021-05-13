import React, {useEffect, useState} from 'react';
import './App.css';
import {InputBlock} from './components/InputBlock/InputBlock'
import {ResultsBlock} from "./components/ResultsBlock/ResultsBlock";
import * as axios from "axios";


function App() {

    const [state, setState] = useState({mainState: [], filteredState: []})
    const [filter, setFilter] = useState([])
    useEffect(() => axios.get('http://localhost:3000/aerodrome').then(el => setState({
        mainState: el.data,
        filteredState: el.data
    })), [])

    useEffect(() => {
        setState(prevState => (
            {
                ...state,
                filteredState: prevState.mainState.filter(el => {
                    if (filter.altitude <= el.mainInfo.vertical.to && filter.altitude >= el.mainInfo.vertical.from) {
                        return filter.point === "" ? true : el.mainInfo.points.indexOf(filter.point.toUpperCase()) > -1;
                    }
                })
            }))
    }, [filter, state])

    return (
        <div className="wrapper">
            <div className="container">
                <InputBlock setFilter={setFilter}/>
                <ResultsBlock data={state.filteredState}/>
            </div>
        </div>
    );
}

export default App;
