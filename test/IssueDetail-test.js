'use strict';
import chai from 'chai';
import React from 'react/addons';
import IssueDetail from '../src/components/IssueDetail';

const expect = chai.expect;
const TestUtils = React.addons.TestUtils;


const data = {
    user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/12707452?v=3',
        login: 'testUser',
        labels: [
            {
              "url": "https://api.github.com/repos/octocat/Hello-World/labels/bug",
              "name": "bug",
              "color": "f29513"
            }
        ]
    },
    state: 'open',
    number: 1234,
    body: 'this is a test content'
}

var detail;

describe('IssueDetail', () => {
    beforeEach(function() {
        detail = TestUtils.renderIntoDocument( 
            <IssueDetail data={data} loadingComments={false} />
        );
    });

    it ('should has no comments', () => {
        var node = TestUtils.findRenderedDOMComponentWithClass(detail, 'issue-detail-body-comment');
        expect(node.getDOMNode().childNodes.length).to.equal(0);
    });

    it ('should be open state', () => {
        var node = TestUtils.findRenderedDOMComponentWithClass(detail, 'issue-state');
        expect(node.getDOMNode().textContent).to.equal('open');
    });
    
});
