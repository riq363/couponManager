import * as types from '../actions/action-types';
const initialState = {
  selectedCoupon: '',
  coupons: '',
  aplication: {
    ready: false
  },
  modal: {
    show: false
  }
};

const couponReducer = function(state = initialState, action) {

  switch(action.type) {

		case types.GET_COUPONS_FROM_BASE:
      return { ...state,  coupons: action.payload.data };

    case types.OPEN_COPY_MODAL:
      return { ...state,  modal: { show : action.payload}  };

    case types.CLOSE_COPY_MODAL:
      return { ...state,  modal: { show : action.payload}  };

    case types.SET_APP_READY:
      return { ...state,  aplication: { ready : action.payload}  };

    case types.SET_ACTIVE_COUPON:
      return { ...state,  selectedCoupon: action.payload };

		default: return state
  }

  return state;

}

export default couponReducer;
