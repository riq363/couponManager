'use strict';
import React from 'react';
import {bindMethods} from 'service';
import s from 'styles/CouponManager/Main.scss';
import Coupon from 'coupon.jsx';
import {getCouponsFromBase, setAppReady} from '../react/actions/coupon-actions.js';
import _ from 'lodash';
import {connect} from 'react-redux';

// console.log(getCouponsFromBase());

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        bindMethods(this, ['makeCoupons', 'mekeCouponsGroups', 'componentDidMount', 'componentWillMount']);
    }
    componentWillMount() {
        // this.props.getCouponsFromBase();
        // this.setState({data: store.getState().couponState});
    }
    componentDidMount() {
        this.props.getCouponsFromBase();
        !this.props.aplication.ready? this.props.setAppReady(): null;
        // this.setState((s)=>{
        // 	 s = getCouponsFromBase().payload;
        // 	 return s;
        // });
    }
    mekeCouponsGroups(data) {
        // const couponArray = this.props.coupons.items;
        const couponGroupObj = {};
				console.log(data);
        data.forEach((obj, id) => {
            if (!couponGroupObj[obj.name]) {
                couponGroupObj[obj.name] = [];
            }
            couponGroupObj[obj.name].push(obj);
        });
        return couponGroupObj
    }
    makeCoupons() {
        if (_.isObject(this.props.coupons)) {
            const coupons = this.mekeCouponsGroups(this.props.coupons.items);
            const rows = [];
            let i = 0;
            for (var coupon in coupons) {
                if (coupons.hasOwnProperty(coupon)) {
                    const codes = coupons[coupon].map((item) => item.code);
                    rows.push(<Coupon data={coupons[coupon][0]} active={i == 0} key={i} codes={codes}/>);
                    i++;
                }
            }
            return rows;
        }
    }
    render() {
        return (
            <main className={s.Main}>
                {this.makeCoupons()}
            </main>
        );
    }
}
function mapStateToProps(state) {
    return {coupons: state.couponReducer.coupons,aplication: state.couponReducer.aplication }
}
export default connect(mapStateToProps, {getCouponsFromBase, setAppReady})(Main);
