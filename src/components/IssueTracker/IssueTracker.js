'use strict';

import React, { Component } from 'react';
import IssueTable from '../IssueTable';
import Pagination from '../Pagination';
import DataTable from '../DataTable';


class IssueTracker extends Component {

    // constructor() {
    //     super();
    //     this.state = {
    //         tableData: []
    //     }
    // }

    // componentDidMount() {
    //     var data = this.props.initialData;
    //     const rowCount = Constants.rowCount;

    //     if (this.props.initialData.length > Constants.rowCount) {
    //          data = data.slice(0, rowCount-1);  // by default show page 1
    //     }
    //     this.setState({
    //         tableData: data
    //     });
    // }

    render() {
        return (
            <div className='IssueTracker'>
                <h1>Table</h1>
                <DataTable 
                    initialData={this.props.initialData}
                    pageSize={10}
                    pageSizeOptions={[10, 25, 50, 100]} />
            </div>
        );
    }
}

IssueTracker.defaultProps = { initialData: [] }

export default IssueTracker;