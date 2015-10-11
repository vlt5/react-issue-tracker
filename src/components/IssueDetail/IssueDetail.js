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
            console.log('#########fetch comments', data.comments);
            var request = Request(data.comments_url);
            request.then(
                // success callback
                (data, xhr) => {
                    this.setState({
                        comments: data,
                    });
                },
                
                // fail callback
                (data, xhr) => {
                    console.error('Failed to fetch comments', data);
                }

            );
        }
    }

    // componentWillMount() {
    //     console.log('componentWillMount', this.props.data);
    // }

    // componentWillReceiveProps() {
    //     console.log('componentWillReceiveProps');
    // }

    render() {
        const data = this.props.data || {},
            user = data.user || {},
            labels = data.labels || [];

        const comments = this.state.comments.map((d, i) => {
            let user = d.user || {};
            return <Comment key={'comment-' + i} url={user.avatar_url} name={user.login} content={this.convertTagging(d.body)} />
        });

        const labelSpans = labels.map((label, j) => {
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
                    <Comment url={user.avatar_url} name={user.login} content={this.convertTagging(data.body)} />
                    {this.props.loadingComments && this.state.comments.length === 0? <h2>Loading comments....</h2>: null}
                    {comments}
                </div>
            </div>
        );
    }

    /**
     * convert @name in the input string to <a href='name'>@name</a>
     */
    convertTagging(str) {
        var s = str || '';
        const words = s.split(' ');
        const newWords = words.map((name) => {
            if (name[0] === '@') {
                // remove special char from the name, in case there're special chars in the end of the name, like @name! or @name,
                var trimedName = name.replace(/[^a-zA-Z0-9]/g, ''); 
                return "<a href='https://github.com/" + trimedName + "'>" + name + "</a>";
            } else {
                return name;
            }
        });
        return newWords.join(' ');
    }
}

IssueDetail.defaultProps = { data: {} }

export default IssueDetail;