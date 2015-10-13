'use strict';
import chai from 'chai';
import React from 'react/addons';
import Comment from '../src/components/Comment';

const expect = chai.expect;
const TestUtils = React.addons.TestUtils;

const url = 'https://avatars.githubusercontent.com/u/12707452?v=3',
      name = 'testUser',
      content = '@hello, this is a faked comment';
var comment;

describe('Comment', () => {
    beforeEach(() => {
        comment = TestUtils.renderIntoDocument( 
            <Comment url={url} name={name} content={content} /> 
        );
    });

    it('should has an image, h3 and pre tag', () => {
        var avatarNode = TestUtils.findRenderedDOMComponentWithTag(comment, 'img');
        var nameNode = TestUtils.findRenderedDOMComponentWithTag(comment, 'h3');
        var contentNode = TestUtils.findRenderedDOMComponentWithTag(comment, 'pre');

        expect(avatarNode.getDOMNode().src).to.equal('https://avatars.githubusercontent.com/u/12707452?v=3');
        expect(nameNode.getDOMNode().textContent).to.equal('testUser');
        expect(contentNode.getDOMNode().textContent).to.contain('@hello');

    });


    it('should convert @name into <a> tag', () => {
        var contentNode = TestUtils.findRenderedDOMComponentWithTag(comment, 'pre');
        expect(contentNode.getDOMNode().firstChild.nodeName).to.equal('A');
    });

});

