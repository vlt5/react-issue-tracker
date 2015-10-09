'use strict';

import React, { Component } from 'react';
import classNames from 'classnames';

require('./Pagination.less');

class Pagination extends Component {

    // static defaultProps = {
    //     data: []
    // };

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         pageSize: props.pageSize,
    //         currentPage: 0
    //     }
    // }

    render() {

        const counts = this.props.counts,
              currentPage = this.props.currentPage,
              pageSize = this.props.pageSize,
              range = this.getRowRange(currentPage, pageSize);

        this.pages = Math.ceil(counts / pageSize);  // keep in component level to avoid recalculate

        const pageOps = this.props.pageSizeOptions.map((d, i) => {
            return (<option key={'pageOps-'+i} value={d} >{d}</option>);
        });


        return (
            <div className='Pagination'>
                <ul className='Pagination-items'>
                    <li onClick={this.firstPage.bind(this)} className={classNames({'Pagination-item--disabled': currentPage === 0})}>&lt;&lt;</li>
                    <li onClick={this.prevPage.bind(this)} className={classNames({'Pagination-item--disabled': currentPage === 0})}>&lt;</li>
                    <li>
                        Page {currentPage+1} of {this.pages}
                    </li>
                    <li onClick={this.nextPage.bind(this)} className={classNames({'Pagination-item--disabled': currentPage === this.pages-1})}>&gt;</li>
                    <li onClick={this.lastPage.bind(this)} className={classNames({'Pagination-item--disabled': currentPage === this.pages-1})}>&gt;&gt;</li>
                </ul>

                <select className='Pagination-pageSize' defaultValue={pageSize} onChange={this.pageSizeChange.bind(this)}>
                    {pageOps}
                </select>

                <div className='Pagination-footnote'>
                    View {range.start+1}-{range.end}
                </div>
            </div>
        );
    }

    gotoPage(page) {
        if (page !== this.props.currentPage) {
            const range = this.getRowRange(page, this.props.pageSize);
            this.props.onPaginationChange({
                pageSize: this.props.pageSize,
                currentPage: page,
                range: range
            });
        }
    }

    firstPage() {
        this.gotoPage(0);
    }

    lastPage() {
        this.gotoPage(this.pages - 1);
    }
    
    prevPage() {
        var page = this.props.currentPage - 1;
        if (page < 0) {    
            page = 0;
        }
        this.gotoPage(page);
    }

    nextPage() {
        var page = this.props.currentPage + 1;
        if (page > this.pages - 1) {    // since currentPage start from 0
            page = this.pages - 1;
        }
        this.gotoPage(page);
    }

    pageSizeChange(e) {
        const pageSize = parseInt(e.target.value, 10),
              range = this.getRowRange(0, pageSize);

        this.props.onPaginationChange({
            pageSize: pageSize,
            currentPage: 0,
            range: range
        });
    }

    /* get startIndex and endIdx based on currentPage and pageSize (startIndex>=0) */
    getRowRange(currentPage, pageSize) {
        const start = currentPage * pageSize;
        return {
            start: start,
            end: (start + pageSize) > this.props.counts? this.props.counts : (start + pageSize)
        }
    }
}

Pagination.defaultProps = { pageSize: 25 }

export default Pagination;