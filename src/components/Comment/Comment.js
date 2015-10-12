import React, { Component } from 'react';

require('./Comment.less');

class Comment extends Component {

    render() {
        var content = this.convertTagging(this.props.content);
        return (
            <div className='Comment'>
                <img className='avartar' src={this.props.url} />
                <div className='Comment-section'>
                    <h3>{this.props.name}</h3>
                    <pre>{content}</pre>
                </div>
            </div>
        );
    }

    /**
     * convert @name in the input string to <a href='name'>@name</a>
     */
    convertTagging(str) {
        var words = str.split(' ');
        var newWords = words.map((name, i) => {
            if (name[0] === '@') {
                // remove special char from the name, in case there're special chars in the end of the name, like @name! or @name,
                var trimedName = name.replace(/[^a-zA-Z0-9]/g, ''); 
                return <a key={'content-'+i} href={'https://github.com/' + trimedName} > {name} </a>
            } else {
                return name + ' ';
            }
        });
        return newWords;
    }
}

Comment.defaultProps = { content: '' }

export default Comment;