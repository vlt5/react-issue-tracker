'use strict';

import React, { Component } from 'react';
import IssueTable from '../IssueTable';
import Pagination from '../Pagination';

class DataTable extends Component {
    render() {
        return (
            <div className='DataTable'>
                <IssueTable data={this.props.tableData} />
                <Pagination 
                    counts={this.props.counts} 
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize} 
                    pageSizeOptions={this.props.pageSizeOptions}
                    onPaginationChange={this.props.onPaginationChange} />
            </div>
        );
    }
}

export default DataTable;