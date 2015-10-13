'use strict';
import chai from 'chai';
import React from 'react/addons';
import Pagination from '../src/components/Pagination';

const expect = chai.expect;
const TestUtils = React.addons.TestUtils;


var pagination;
var input = {
    counts: 30,
    currentPage: 0,
    pageSize: 25,
    pageSizeOptions: [10, 25, 50],
    onPaginationChange: onPaginationChange
}

function onPaginationChange() {
    console.log('onPaginationChange');
    input.currentPage++;
}

describe('Pagination', () => {
    beforeEach(() => {
        pagination = TestUtils.renderIntoDocument(
            <Pagination 
                counts={input.counts} 
                currentPage={input.currentPage}
                pageSize={input.pageSize} 
                pageSizeOptions={input.pageSizeOptions}
                onPaginationChange={input.onPaginationChange} />
        );
    });

    it ('should has two pages with current page 1', () => {
        var node = TestUtils.findRenderedDOMComponentWithClass(pagination, 'pagination-item-page');
        expect(node.getDOMNode().textContent).to.equal('Page 1 of 2');
    });

    it ('should show first 25 records of 30', () => {
        var node = TestUtils.findRenderedDOMComponentWithClass(pagination, 'pagination-footnote');
        expect(node.getDOMNode().textContent).to.equal('View 1 - 25 of 30');
    });

    it ('should has 3 size options', () => {
        var node = TestUtils.findRenderedDOMComponentWithClass(pagination, 'pagination-pageSize');
        expect(node.getDOMNode().childNodes.length).to.equal(3);
    });
    
    it ('it should go to last page', () => {
        var node = TestUtils.findRenderedDOMComponentWithClass(pagination, 'pagination-items');
        TestUtils.Simulate.click(node.getDOMNode().lastChild);

        pagination = TestUtils.renderIntoDocument(
            <Pagination 
                counts={input.counts} 
                currentPage={input.currentPage}
                pageSize={input.pageSize} 
                pageSizeOptions={input.pageSizeOptions}
                onPaginationChange={input.onPaginationChange} />
        );

        var node = TestUtils.findRenderedDOMComponentWithClass(pagination, 'pagination-footnote');
        expect(node.getDOMNode().textContent).to.equal('View 26 - 30 of 30');
    });


}); 