'use strict';

import React from 'react';
import Request from '@typicode/pegasus';

require('./Layout.less');

class Layout extends React.Component {
    componentDidMount() {
        var request = Request('/json/data.json');
        request.then( 
            // success callback
            (data, xhr) => {
                console.log(data);
            }, 

            // fail callback
            (data, xhr) => {
                console.error(data, xhr.status);
            }
            
        );
    }

    render() {
        return (
            <div className='layout'>
                <h1>Hello there</h1>
                <p>Muuuaaaaap</p>
                <div className='img-test'></div>
            </div>
        );
    }
}

export default Layout;