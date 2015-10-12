'use strict';

import React, { Component } from 'react';
import Request from '@typicode/pegasus';
import page from 'page';
import DataTable from '../DataTable';
import IssueDetail from '../IssueDetail';

class IssueViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueIdx: 0,    // issue index in the array
            currentPage: 0,
            pageSize: props.pageSize,
            data: [],
            start: 0,   // start row index
            end: props.pageSize,    // end row index
            view: 'DATA_TABLE'
        }
    }

    componentWillMount() {
        this.setupRouter();
    }

    componentDidMount() {
        this.loadInitialData();
    }

    render() {
        var view;
        if (this.state.view === 'DATA_TABLE') {
            let tableData = this.getFilteredData(this.state.data, { start: this.state.start, end: this.state.end });
            view = <DataTable 
                        tableData = {tableData}
                        counts = {this.state.data.length}
                        currentPage = {this.state.currentPage}
                        pageSize = {this.state.pageSize}
                        pageSizeOptions = {this.props.pageSizeOptions}
                        onPaginationChange = {this.onPaginationChange.bind(this)} /> ;

        } else {    // detail page
            let detailData = this.state.data[this.state.issueIdx] || {};
            view = <IssueDetail data={detailData} loadingComments={detailData.comments > 0} />
        }

        return ( 
            <div className='IssueTracker'>
                {view}
            </div>
        );
    }

    /* load data and keep in state */
    loadInitialData() {
        var request = Request('/json/data.json');
        request.then( 
            // success callback
            (data, xhr) => {
                /**
                 * Give individual issue data an index so that when click on issue title
                 * we can quickly get the issue detail data in O(1) instead of firing request again.
                 */
                data.forEach((d, i) => {
                    d.idx = i;
                });

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

    setupRouter() {
        page('/', (ctx) => {
            this.setState({ view: 'DATA_TABLE' });
        });

        page('/issue=:id&idx=:idx', (ctx) => {
            this.setState({ view: 'ISSUE_DETAIL', issueIdx: ctx.params.idx });
        });

        page('*', (ctx) => {
            this.setState({ view: 'DATA_TABLE' });
        });

        page();
    }

    /**
     * when click on pagination
     */
    onPaginationChange(info) {
        this.setState({
            pageSize: info.pageSize,
            currentPage: info.currentPage,
            start: info.range.start,
            end: info.range.end
        });
    }


    /** 
     * Get range data that will shown in the table
     */
    getFilteredData(allData, range) {
        var data = allData || [];
        // only if {end-start} is a portion of initialData, we do slice.
        if (range.end - range.start < data.length) {
            data = data.slice(range.start, range.end);
        }
        return data;
    }


}

export default IssueViewer;