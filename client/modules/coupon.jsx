'use strict';
import React from 'react';
import {bindMethods} from 'service';
import moment from 'moment';
import s from 'styles/CouponManager/Coupon.scss';
import Code from 'code.jsx';
import {setActiveCoupon} from '../react/actions/coupon-actions.js';
import {connect} from 'react-redux';


class Coupon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
		bindMethods(this, ['componentDidMount','toggleCoupon', 'getCouponDate','getCouponStatus','makeCodes','selectCoupon']);
	}
	componentDidMount() {
		this.props.active? this.props.setActiveCoupon(this.props.data) : null;
	}
	toggleCoupon(){
		 return this.setState({open: !this.state.open});
	}
	getCouponDate(date){
		return moment(date).format('MMM D YYYY');
	}
	getCouponStatus(status){
		switch (status) {
			case 'ACTIVE':
			 return 'active';
				break;
			case 'PAUSED':
			 return 'paused';
				break;
			case 'EXPIRED':
				return 'expired';
				break;
			case 'USEDUP':
				return 'usedup';
				break;
		}
	}
	makeCodes(){
		return this.props.codes.map((item, key) => {
			return <Code code={item} key={key}/>
		})
	}
	selectCoupon(obj){
		this.props.setActiveCoupon(obj);
	}
	render() {
		return (
			<div className={s.container}>
			<div className={`${s.Coupon} ${this.state.open? s.CouponOpen : ''}`}>
				<div className={`${s.checkbox} normalized`}>
					<div className="radio">
					    <label>
					        <input type="radio" name="coupon" value="9999" defaultChecked={this.props.active} onChange={this.selectCoupon.bind(this, this.props.data)}/>
									<span className={`radio-label ${s.radioLabel}`}></span>
					    </label>
					</div>
				</div>
				<div className={s.name}>{this.props.data.name}</div>
				<div className={s.discount}>{this.props.data.discountType}</div>
				<div className={s.date}>
					<span className={s.disabled}>{this.getCouponDate(this.props.data.creationDate)}</span> - {this.props.data.expirationDate ? this.getCouponDate(this.props.data.expirationDate):'until deactivated'}
				</div>
				<div className={`
						${s.status}
						${s[this.getCouponStatus(this.props.data.status)]}
					`}>{this.props.data.status}</div>
				<div className={`${s.toggler}   ${this.state.open? s.togglerOpen : ''}`} onClick={this.toggleCoupon}>
					<span className="icon-arr-down"></span>
				</div>
			</div>
				<div className={`${s.footer } ${this.state.open? s.footerOpen : ''} normalized`}>
					{this.makeCodes()}
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
    return {selectedCoupon: state.couponReducer.selectedCoupon}
}
export default connect(mapStateToProps, {setActiveCoupon})(Coupon);
