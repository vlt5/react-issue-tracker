import React, { Component } from 'react';

require('./Comment.less');

class Comment extends Component {

    createMarkup(str) {
        return { __html: str}
    }

    render() {
        return (
            <div className='comment'>
                <img className='avartar' src={this.props.url} />
                <div className='comment-section'>
                    <h3>{this.props.name}</h3>
                    <pre dangerouslySetInnerHTML={ this.createMarkup(this.props.content)} />
                </div>
            </div>
        );
    }
}

Comment.defaultProps = { content: [] }

export default Comment;