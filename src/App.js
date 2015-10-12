import React, { Component } from 'react';
import IssueViewer from './components/IssueViewer';

require('./App.less');

export default class App extends Component {
    render() {
        return (
            <IssueViewer pageSize={25} pageSizeOptions={[10, 25, 50, 100]} />
        );
    }
}