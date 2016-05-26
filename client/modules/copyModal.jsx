import React from 'react';
import {bindMethods} from 'service';
import {connect} from 'react-redux';
import {closeCopyModal, generateCoupons, getCouponsFromBase} from '../react/actions/coupon-actions.js';
import s from 'styles/CouponManager/Popup.scss';
import 'chance';
import axios from 'axios';
import {storeId, accessToken} from 'ecwidConfig';
const chance = new Chance();

class CopyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            copyConfig: {
                amount: 0,
                prefix: 'myStore--',
                random: true,
                valid: false
            }
        };
        bindMethods(this, [
            'closeModal',
            'handleChangeNumber',
            'handleChangeprefix',
            'handleChangeRandom',
            'submitGenerator',
            'getRandomCode'
        ]);
    }
    componentDidMount() {}
    closeModal() {
        this.props.closeCopyModal();
    }
    handleChangeNumber(event) {
        const count = Math.abs(event.target.value) < 50
            ? Math.abs(event.target.value)
            : 50;
        this.setState(s => {
            s.copyConfig.amount = count
            return s
        });
    }
    handleChangeprefix(event) {
        const value = event.target.value;
        this.setState(s => {
            s.copyConfig.prefix = value
            return s
        });
    }
    handleChangeRandom() {
        this.setState(s => {
            s.copyConfig.random = !s.copyConfig.random;
            return s
        });
    }
    getRandomCode(length) {
        return chance.hash({length});
    }
    submitGenerator() {
        if (this.state.copyConfig.amount == 0 || this.state.copyConfig.prefix.length == 0) {
            return alert('Please insert correct form data');
        }
        let promises = [];
        for (var i = 1; i <= this.state.copyConfig.amount; i++) {
            let code = '';
            if (this.state.copyConfig.random) {
                code = this.getRandomCode(12);
            } else {
                code = `${this.state.copyConfig.prefix}-${this.getRandomCode(5)}`
            }
            promises.push(axios.post(`https://app.ecwid.com/api/v3/${storeId}/discount_coupons?token=${accessToken}`, { ...this.props.selectedCoupon, code }))
        }
        axios.all(promises)
          .then(result => {
            this.props.getCouponsFromBase();
            return console.log(result);
          });

    }
    render() {
        return (
            <div className={`${s.mainOverlay} ${this.props.modal.show
                ? ''
                : s.hidden}`}>
                <div className={`${s.mainPopup} ${s.mainPopup_center}`}>
                    <div className={s.mainPopup__container}>
                        <div onClick={this.closeModal} className={s.mainPopup__close}>
                            <svg width="12" height="12" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg" id="svg-close" className={s.svgClose}>
                                <path d="M3.865.79L2.652 2.002l1.213 1.213c.18.18.18.472 0 .653-.09.09-.208.135-.327.135-.118 0-.236-.045-.326-.135L2 2.655.786 3.868c-.09.09-.208.135-.326.135-.117 0-.236-.045-.326-.135-.18-.18-.18-.473 0-.653l1.213-1.213L.134.79c-.18-.18-.18-.473 0-.653.18-.18.473-.18.653 0L2 1.35 3.21.137c.18-.18.472-.18.653 0 .18.18.18.473 0 .653z"></path>
                            </svg>
                        </div>
                        <div className={s.mainPopup__logo}>
                            <svg width="58" height="58" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" id="svg-question" className={s.svgQuestion}>
                                <path d="M14.26 17.98c0-3.29 4.35-3.64 4.35-5.94 0-1.05-.81-1.94-2.56-1.94-1.17 0-2.11.38-2.88 1.01-.53.43-1.31.38-1.77-.13l-.11-.12c-.47-.52-.45-1.34.08-1.8 1.32-1.12 3.05-1.77 5-1.77 3.4 0 5.48 1.81 5.48 4.24 0 3.99-4.83 4.32-4.83 6.75 0 .09.01.17.03.26.13.63-.32 1.24-.93 1.45-.6.2-1.28-.06-1.55-.64-.21-.41-.31-.87-.31-1.37zM16 25.84c1.127 0 2.04-.913 2.04-2.04s-.913-2.04-2.04-2.04-2.04.913-2.04 2.04.913 2.04 2.04 2.04zM16 32C7.18 32 0 24.82 0 16S7.18 0 16 0s16 7.18 16 16c.01 8.82-7.18 16-16 16zM2.06 15.99c0 7.69 6.26 13.94 13.94 13.94s13.94-6.26 13.94-13.94C29.96 8.3 23.7 2.04 16 2.04 8.32 2.04 2.06 8.3 2.06 15.99z" fill-rule="evenodd"></path>
                            </svg>
                        </div>
                        <h3 className={s.mainPopup__title}>Choose the coupon code prefix and the number of codes</h3>
                        <br/>
                        <br/>
                        <div>
                            Random: {' '}
                            <label className="checkbox tiny">
                                <input type="checkbox" checked="" name="" checked={this.state.copyConfig.random} onChange={this.handleChangeRandom}/>
                                <div data-on="enabled" data-off="disabled">
                                    <div/>
                                </div>
                            </label>
                        </div>
                        <br/>
                        <div className="normalized">
                            <label>Prefix:</label>
                            <input type="string" className="form-control input-medium" placeholder="MyCoupon-$$$" value={this.state.copyConfig.prefix} onChange={this.handleChangeprefix} disabled={this.state.copyConfig.random}/>
                        </div>
                        <br/>
                        <div className="normalized">
                            <label>Amount:</label>
                            <input type="number" className="form-control input-medium" placeholder="0" value={this.state.copyConfig.amount} onChange={this.handleChangeNumber} max='50'/>
                        </div>
                        <div className={s.mainPopup__buttons}>
                            <button className="btn btn-primary btn-medium" onClick={this.submitGenerator}>Stay on this page</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {modal: state.couponReducer.modal, selectedCoupon: state.couponReducer.selectedCoupon}
}
export default connect(mapStateToProps, {closeCopyModal, generateCoupons, getCouponsFromBase})(CopyModal);
