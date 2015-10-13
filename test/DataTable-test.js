'use strict';
import chai from 'chai';
import React from 'react/addons';
import DataTable from '../src/components/DataTable';

const expect = chai.expect;
const TestUtils = React.addons.TestUtils;


var table, pagination;

var tableData = [];
const counts = 25;
for (var i = 0; i < counts; i++) {
    tableData.push({
        number: i,
        title: 'title-' + i,
        body: 'content-' + i,
        labels: [],
        state: i % 2 === 0? 'open' : 'closed',
        comment: 0,
        user: {
            login: 'user-' + i,
            avatar_url: 'https://avatars.githubusercontent.com/u/8433955?v=3'
        }
    });
}

var data = {
    tableData: tableData,
    counts: counts,
    currentPage: 0,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
    onPaginationChange: onPaginationChange
}

function onPaginationChange() {
    console.log('onPaginationChange');
}

describe('DataTable', () => {
    beforeEach(function() {
        table = TestUtils.renderIntoDocument( 
            <DataTable 
                tableData = {data.tableData}
                counts = {data.counts}
                currentPage = {data.currentPage}
                pageSize = {data.pageSize}
                pageSizeOptions = {data.pageSizeOptions}
                onPaginationChange = {data.onPaginationChange} />    
        );
    });


    it ('should show a table with pagination', () => {
        var node = TestUtils.findRenderedDOMComponentWithClass(table, 'data-table');
        expect(node.getDOMNode().childNodes.length).to.equal(2);
    });

    it ('table should have 5 columns', () => {
        var node = TestUtils.findRenderedDOMComponentWithTag(table, 'tbody');
        expect(node.getDOMNode().firstChild.childNodes.length).to.equal(5);
    });

    it ('table should have 25 rows', () => {
        var node = TestUtils.findRenderedDOMComponentWithTag(table, 'tbody');
        expect(node.getDOMNode().childNodes.length).to.equal(25);
    });
});

