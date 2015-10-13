'use strict';
import React, { Component } from 'react';

require('./IssueTable.less');

class IssueTable extends Component {

    render() {
        const data = this.props.data || [];
        const rows = data.map((d, i) => {
            let user = d.user || {};

            let labels = d.labels.map((label, j) => {
                return (
                    <span key={'issue-label-'+j} className='issue-label' style={{backgroundColor: '#'+label.color}}>{label.name}</span>
                );
            });

            return  (<tr key={'tr'+i}>
                        <td>
                            <img className='avartar' src={user.avatar_url} alt={user.login} title={user.login} />
                        </td>
                        <td>
                            <div className='issue-title'>
                                <a href={'/issue='+d.number+'&idx='+d.idx}>{d.title}</a>
                                <div className='issue-number'>#{d.number}</div>
                            </div>
                        </td>
                        <td>{labels}</td>
                        <td>{user.login}</td>
                        <td>{d.body.substr(0, 140) + '...'}</td>
                    </tr>);
        });

        return (
            <table className='issue-table'>
                <thead>
                    <tr>
                        <th></th>
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