'use strict';

import React, { Component } from 'react';
import Request from '@typicode/pegasus';
import classNames from 'classnames';
import Comment from '../Comment';

require('./IssueDetail.less');

class IssueDetail extends Component {

    constructor() {
        super();
        this.state =  {
            comments: []
        }
    }

    componentDidMount() {
        var data = this.props.data || {};
        if (data.comments) {
            var request = Request(data.comments_url);
            request.then(
                // success callback
                (data, xhr) => {
                    this.setState({
                        comments: data
                    });
                },
                
                // fail callback
                (data, xhr) => {
                    console.error('Failed to fetch comments', data);
                }
            );
        }
    }

    render() {
        var data = this.props.data || {},
            user = data.user || {},
            labels = data.labels || [];

        var comments = this.state.comments.map((d, i) => {
            let user = d.user || {};
            return <Comment key={'comment-' + i} url={user.avatar_url} name={user.login} content={d.body} />
        });

        var labelSpans = labels.map((label, j) => {
            return (
                <span key={'issue-label-'+j} className='issue-label' style={{backgroundColor: '#'+label.color}}>{label.name}</span>
            );
        });

        return (
            <div className='IssueDetail'>
                <div className='IssueDetail-header'>
                    <h1 className='IssueDetail-header-title'>
                        {data.title} <span className={classNames('issue-state', data.state)}>{data.state}</span>
                    </h1>
                    <h2>#{data.number}</h2>
                    <div className='labels'>{labelSpans}</div>
                </div>
                <div className='IssueDetail-body'>
                    <Comment url={user.avatar_url} name={user.login} content={data.body} />
                    <div className='IssueDetail-body-comment'>
                        {comments}
                    </div>
                </div>
            </div>
        );
    }
}

IssueDetail.defaultProps = { data: {} }

export default IssueDetail;