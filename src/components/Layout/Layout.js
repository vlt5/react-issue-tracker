import React from 'react';

require('./Layout.less');

export default class Layout extends React.Component {
    render() {
        return (
            <div className='layout'>
                <h1>Hello there</h1>
                <p>Muuuuuaaaaaap</p>
                <div className='img-test'></div>
            </div>
        );
    }
}