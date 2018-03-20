import React from 'react';
import PaymentModal from '../../shared/PaymentModal';
import { connect } from 'react-redux';
import { setPaymentPopup } from '../../../../actions/ui';

const priceBox = props => (
  <div id="pricebox" className="box box-primary">
    <div className="box-header with-border">
      <h3 className="box-title">Service billing</h3>
    </div>
    <div className="box-header with-border pricebox-section">
      <div className="row">
        <div className="col-md-4">
          <p>Current plan:</p>
          <p className="pricebox__info-text">Basic</p>
        </div>
        <div className="col-md-4">
          <p>Valid through:</p>
          <p className="pricebox__info-text">5 feb 2019</p>
        </div>
      </div>
    </div>
    <div className="box-header with-border pricebox-section">
      <div className="row">
        <div className="col-md-4">
          <h4 className="pricebox__price-name">Basic (free):</h4>
          <ul className="pricebox__list">
            <li>normal repair cost estimation mode</li>
            <li>verified hundred</li>
            <li>possibility to make an appointment with one hundred</li>
            <li>chat/email support</li>
          </ul>
        </div>
        <div className="col-md-4">
          <h4 className="pricebox__price-name">PRO 49USD/month:</h4>
          <ul className="pricebox__list">
            <li>all the advantages of a basic fare</li>
            <li>priority evaluation and urgent execution</li>
            <li>there are no restrictions on the number of machines</li>
            <li>individual manager and help</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4">
          <button onClick={() => { props.dispatch(setPaymentPopup(true)); }} type="button" className="btn btn-danger btn-lg">Go PRO</button>
          <a className="pricebox__pro-link" href="#">More information about the possibilities in the PRO Plan</a>
        </div>
      </div>
    </div>

    {props.showPaymentPopup && <PaymentModal />}

  </div>
);

function mapStateToProps(state) {
  return {
    showPaymentPopup: state.ui.showPaymentPopup,
  };
}

export default connect(mapStateToProps)(priceBox);
