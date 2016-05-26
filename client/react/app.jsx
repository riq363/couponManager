'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import s from 'styles/CouponManager/CouponManager.scss';
import Aside from 'aside.jsx';
import Main from 'main.jsx';
import CopyModal from 'copyModal.jsx';

export default class App extends React.Component {
    constructor(props){
    	super(props);
      this.state = {
        data: ''
      };
    }
    render() {
        return (
          <div className={s.CouponManager}>
                <h1>Coupon Manager</h1>
                <div className="ecwid-g-r">
                    <div className="ecwid-u-2-3">
                        <Main />
                    </div>
                    <div className="ecwid-u-1-3">
                        <Aside/>
                    </div>
                </div>
                <CopyModal/>
            </div>)
    }
};
