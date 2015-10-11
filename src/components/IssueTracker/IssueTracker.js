'use strict';

import React, { Component } from 'react';
import page from 'page';
import DataTable from '../DataTable';
import IssueDetail from '../IssueDetail';
import Request from '@typicode/pegasus';


class IssueTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tableData: [],
            pageSize: 25,
            currentPage: 0
        }
    }

    // componentWillMount() {
    //     // var data = this.props.initialData;
    //     // const rowCount = Constants.rowCount;

    //     // if (this.props.initialData.length > Constants.rowCount) {
    //     //      data = data.slice(0, rowCount-1);  // by default show page 1
    //     // }
    //     // this.setState({
    //     //     tableData: data
    //     // });

    //     // page.base('/');
    //     // console.log(page);
        

    //     page('/', (ctx) => {
    //         console.log('/');
    //         this.setState({ view: <DataTable 
    //                 initialData={this.state.data}
    //                 pageSize={10}
    //                 pageSizeOptions={[10, 25, 50, 100]} /> });
    //     });

    //     page('/issue=:id', (ctx) => {

    //         console.log('IssueDetailpage', ctx.params.id);
    //         this.setState({
    //             view: <IssueDetail data={this.state.data[0]} />
    //         });
    //     });

    //     page('*', (ctx) => {
    //         console.log('*', ctx.params);
    //         this.setState({ view: <h1>page not found</h1>});
    //     });

    //     page();
    // }

    // componentDidMount() {
    //     var request = Request('/json/data.json');
    //     request.then( 
    //         // success callback
    //         (data, xhr) => {
    //             console.log(data);
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

    // componentWillReceiveProps(nextProps) {
    //     // console.log('nextProps', nextProps);
    //     this.setState({
    //         view: <DataTable 
    //                 initialData={nextProps.initialData}
    //                 pageSize={10}
    //                 pageSizeOptions={[10, 25, 50, 100]} /> 
    //     });
    // }


    componentDidMount() {
        var request = Request('/json/data.json');
        request.then( 
            // success callback
            (data, xhr) => {
                // give individual issue data an index so that when click on issue title
                // we can quickly get the issue detail data in O(1)
                data.forEach((d, i) => {
                    d.idx = i;
                });


                const tableData = this.getFilteredData(data, { start: 0, end: this.state.pageSize });

                this.setState({
                    tableData: tableData,
                    data: data
                });
            }, 

            // fail callback
            (data, xhr) => {
                console.error(data, xhr.status);
            } 
        );


        // this.setState({
        //     tableData: tableData
        // });
    }

    // componentWillReceiveProps(nextProps) {

    //     const tableData = this.getFilteredData(nextProps.initialData, { start: 0, end: this.state.pageSize });
    //     this.setState({
    //         tableData: tableData
    //     });
    // }

    render() {
        var view = <div></div>
        console.log('this.props.view', this.props.view);

        // const tableData = this.getFilteredData(this.state.data, { start: 0, end: this.state.pageSize });

        switch (this.props.view) {
            case 'datatable':
            console.log('this.state.tableData', this.state.tableData);

                view = <DataTable 
                        tableData={this.state.tableData}
                        counts={this.state.data.length}
                        currentPage={this.state.currentPage}
                        pageSize={this.state.pageSize}
                        pageSizeOptions={[10, 25, 50, 100]}
                        onPaginationChange={this.onPaginationChange.bind(this)} />;
                break;

            case 'issuedetail':
                console.log('idx', this.props.idx);
                console.log('data', this.props.initialData);

                let data = this.state.data[this.props.idx] || {};

                view = <IssueDetail data={data} loadingComments={data.comments > 0} />;
                break;

            case 'notfound':
                view = <h1>page not found</h1>;
                break;

            default: 
                break;
        }

        return (
            <div className='IssueTracker'>
                <h1>Table</h1>
                {view}
            </div>
        );
    }



    onPaginationChange(info) {
        const tableData = this.getFilteredData(this.state.data, info.range);

        this.setState({
            pageSize: info.pageSize,
            currentPage: info.currentPage,
            tableData: tableData
        });
    }


     // get the portion that will shown in table 
    getFilteredData(allData, range) {
        var data = allData || [];
        // only if {end-start} is a portion of initialData, we do slice.
        if (range.end - range.start < data.length) {
            data = data.slice(range.start, range.end);
        }
        return data;
    }


}

IssueTracker.defaultProps = { initialData: [] }

export default IssueTracker;