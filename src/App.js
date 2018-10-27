import React, { Component } from 'react';
import Simulation from './Simulation';
import WebWorker from './WebWorker';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { arr: [], iteration: 0 };
    }

    componentDidMount() {
        this._worker = new WebWorker(Simulation);

        this._worker.onmessage = (e) => {
            if (!e) return;

            this.setState({
                arr: e.data.data
                    .map(x => {
                        return {name: '', uv: x};
                    }),
                iteration: e.data.iteration
            });
        };
    }

    componentWillUnmount() {
        this._worker.terminate();
    }

    startSimulation() {
        this._worker.postMessage('start');
    }
    
    render() {
        return (
            <div className="App">
                <div className='App-header'>
                    <LineChart width={800} height={400} data={this.state.arr}>
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Line type='monotone' dataKey='uv' stroke='#8884D8' />
                    </LineChart>
                    <p>Iteration: { this.state.iteration }</p>
                    <button onClick={() => this.startSimulation()}>Start</button>
                </div>
            </div>
        );
    }
}

export default App;