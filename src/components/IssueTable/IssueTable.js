'use strict';
import React, { Component, PropTypes } from 'react';

require('./IssueTable.less');

class IssueTable extends Component {

    render() {
        var data = this.props.data || [];
        var rows = data.map((d, i) => {
            var labels = d.labels.map((label, j) => {
                return (
                    <span key={'issue-label-'+j} className='issue-label' style={{backgroundColor: '#'+label.color}}>{label.name}</span>
                );
            });

            return  (<tr key={'tr'+i}>
                        <td>
                            <img className='avartar' src={d.user.avatar_url} alt={d.user.login} title={d.user.login} />
                        </td>
                        <td>
                            <div className='issue-title'>
                                <a href={'/issue='+d.number+'&idx='+d.idx}>{d.title}</a>
                                <div className='issue-number'>#{d.number}</div>
                            </div>
                        </td>
                        <td>{labels}</td>
                        <td>{d.user.login}</td>
                        <td>{d.body.substr(0, 140) + '...'}</td>
                    </tr>);
        });

        return (
            <table className='IssueTable'>
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