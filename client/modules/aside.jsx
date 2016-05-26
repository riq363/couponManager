'use strict';
import React from 'react';
import {bindMethods} from 'service';
import {connect} from 'react-redux';
import {openCopyModal} from '../react/actions/coupon-actions.js';

import s from 'styles/CouponManager/Aside.scss';

export default class Aside extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		bindMethods(this, ['openModal']);
	}
	componentDidMount() {}
	openModal(){
		this.props.openCopyModal();
	}
	render() {
		return (
			<aside className={s.Aside}>
				<h2>Please select coupon you want to manage</h2>
				<div><button className="btn btn-primary btn-large" onClick={this.openModal}><i className="icon-gallery"></i>Copy coupon</button></div>
				<br/>
				<div><button className="btn btn-primary btn-large"><i className="icon-print"></i>Print coupon</button></div>
			</aside>
		);
	}
}
function mapStateToProps(state) {
    return {modal: state.couponReducer.modal}
}
export default connect(mapStateToProps, {openCopyModal})(Aside);
