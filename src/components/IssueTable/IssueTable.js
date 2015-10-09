'use strict';

import React, { Component, PropTypes } from 'react';
require('./IssueTable.less');

class IssueTable extends Component {
    // static propTypes = {
    //     tableData: PropTypes.array
    // }

    // static defaultProps = {
    //     tableData: []
    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps -- table', nextProps);
    // }

    render() {
        var data = this.props.data || [];
        var rows = data.map((d, i) => {
            return  (<tr key={'tr'+i}>
                        <td>{d.number}</td>
                        <td>{d.title}</td>
                        <td>{d.labels}</td>
                        <td>{d.user.login}</td>
                        <td>{d.body.substr(0, 140) + '...'}</td>
                    </tr>);
        });

        return (
            <table className='IssueTable table-hovered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Labels</th>
                        <th>User</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default IssueTable;