import React, { Component } from 'react';
import Request from '@typicode/pegasus';
import page from 'page';
import IssueTracker from './components/IssueTracker';

require('./App.less');

export default class App extends Component {
    constructor() {
        super();

        /** 
         *  Keep all states at app level, subcomponents don't hold any state. 
         *  This helps with keep data flow simple.
         */
        this.state = {
            data: [],
            idx: 0,
            view: 'empty'
        }
    }

    componentWillMount() {
        this.setupRouter();
    }

    // componentDidMount() {
    //     var request = Request('/json/data.json');
    //     request.then( 
    //         // success callback
    //         (data, xhr) => {
    //             // give individual issue data an index so that when click on issue title
    //             // we can quickly get the issue detail data in O(1)
    //             data.forEach((d, i) => {
    //                 d.idx = i;
    //             });

    //             this.setState({
    //                 data: data
    //             });
    //         }, 

    //         // fail callback
    //         (data, xhr) => {
    //             console.error(data, xhr.status);
    //         } 
    //     );
    // }

    render() {
        return (
            <IssueTracker initialData={this.state.data} view={this.state.view} idx={this.state.idx} />
        );
    }

    setupRouter() {
        page('/', (ctx) => {
            console.log('/');
            this.setState({
                view: 'datatable'
            });
        });

        page('/issue=:id&idx=:idx', (ctx) => {
            // console.log('IssueDetailpage', ctx.params.id);
            // console.log('IssueDetailpage', ctx.params.idx);
            var idx = ctx.params.idx;
            console.log('get idx', idx);
            this.setState({
                view: 'issuedetail',
                idx: idx
            });
        });

        page('*', (ctx) => {
            console.log('*', ctx.params);
            // this.setState({ view: <h1>page not found</h1>});
            this.setState({
                view: 'notfound'
            });
        });

        page();
    }
}