import React from 'react';
import Request from '@typicode/pegasus';
import IssueTracker from './components/IssueTracker';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        var request = Request('/json/data.json');
        request.then( 
            // success callback
            (data, xhr) => {
                // console.log(data);
                this.setState({
                    data: data
                });
            }, 

            // fail callback
            (data, xhr) => {
                console.error(data, xhr.status);
            }
            
        );
    }

    render() {
        return (
            <IssueTracker initialData={this.state.data}/>
        );
    }
}