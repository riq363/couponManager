import * as types from '../actions/action-types';
import axios from 'axios';
import {
    storeId,
    accessToken
} from 'ecwidConfig';


export function getCouponsFromBase() {
    const response = axios.get(`https://app.ecwid.com/api/v3/${storeId}/discount_coupons?token=${accessToken}`);
    return {
        type: types.GET_COUPONS_FROM_BASE,
        payload: response
    }
    // return function(dispatch) {
    //   axios.get('./data.json').then((response) => {
    //     dispatch({
    //       type: types.GET_COUPONS_FROM_BASE,
    //       payload: response
    //     })
    //   });
    // }
}
export function generateCoupons(amount, pattern) {
    return function(dispatch) {
        axios.post(
            `https://app.ecwid.com/api/v3/${storeId}/discount_coupons?token=${accessToken}`, {

            }
        ).then((response) => {
            dispatch({
                type: types.GET_COUPONS_FROM_BASE,
                payload: response
            })
        });
    }
}

export function openCopyModal() {
    return {
        type: types.OPEN_COPY_MODAL,
        payload: true
    }
}
export function setActiveCoupon(obj) {
    return {
        type: types.SET_ACTIVE_COUPON,
        payload: obj
    }
}
export function closeCopyModal() {
    return {
        type: types.CLOSE_COPY_MODAL,
        payload: false
    }
}

export function setAppReady() {
    return {
        type: types.SET_APP_READY,
        payload: true
    }
}
