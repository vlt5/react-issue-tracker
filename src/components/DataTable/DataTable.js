'use strict';

import React, { Component } from 'react';
import IssueTable from '../IssueTable';
import Pagination from '../Pagination';

class DataTable extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // tableData: [],
    //         // pageSize: props.pageSize,
    //         // currentPage: 0
    //     }
    // }

    // componentDidMount() {
    //     const tableData = this.getFilteredData(this.props.initialData, { start: 0, end: this.props.pageSize });
    //     this.setState({
    //         tableData: tableData
    //     });
    // }

    // componentWillReceiveProps(nextProps) {
    //     const tableData = this.getFilteredData(nextProps.initialData, { start: 0, end: this.props.pageSize });
    //     this.setState({
    //         tableData: tableData
    //     });
    // }

    render() {
        // const initialData = this.props.initialData || [];

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

    // onPaginationChange(info) {
    //     const tableData = this.getFilteredData(this.props.initialData, info.range);

    //     this.setState({
    //         pageSize: info.pageSize,
    //         currentPage: info.currentPage,
    //         tableData: tableData
    //     });
    // }


    //  get the portion that will shown in table 
    // getFilteredData(allData, range) {
    //     var data = allData || [];
    //     // only if {end-start} is a portion of initialData, we do slice.
    //     if (range.end - range.start < data.length) {
    //         data = data.slice(range.start, range.end);
    //     }
    //     return data;
    // }

}

export default DataTable;