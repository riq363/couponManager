'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import store from './store';
import App from './app.jsx';
import 'ecwidConfig';


class CouponManager extends React.Component {
    constructor(props){
    	super(props);
      this.state = { };
    }
    render() {
        return <Provider store={store}>
            <App/>
        </Provider>;
    }
}

ReactDOM.render(
    <CouponManager/>, document.getElementById("application"));
