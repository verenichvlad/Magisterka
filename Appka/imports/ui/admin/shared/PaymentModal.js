import React from 'react';
import { jQuery } from 'meteor/jquery';
import { connect } from 'react-redux';
import Cards from 'react-credit-cards';
import Payment from 'payment';

import 'react-credit-cards/lib/styles.scss';

import { setPaymentPopup } from '../../../actions/ui';
import PushSuccess from '../../../util/PushSuccess';
import PushError from '../../../util/PushError';


class PaymentModal extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: '',
    isValid: false,
  };

  componentDidMount() {
    jQuery('#paymentModal').modal('toggle');
    jQuery('#paymentModal').on('hidden.bs.modal', this.handleClose);

    Payment.formatCardNumber(document.querySelector('[name="number"]'));
    Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
    Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
  }

  handleClose = () => {
    setTimeout(() => { this.props.dispatch(setPaymentPopup(false)); }, 200);
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      this.setState({
        [target.name]: target.value.replace(/ /g, ''),
      });
    } else if (target.name === 'expiry') {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ''),
      });
    } else {
      this.setState({
        [target.name]: target.value,
      });
    }
  };

  handleCallback = (type, isValid) => {
    this.setState({ isValid });
  }

  handleSubmit = () => {
    if (this.state.isValid) {
      PushSuccess('Billing', 'We have successfully processed your data, but payments are still disabled');
    } else {
      PushError('Billing', 'We could not process your data');
    }

    jQuery('#paymentModal').modal('toggle');
  };

  render() {
    return (
      <div className="modal fade" id="paymentModal">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">Платежная информация</h4>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 payment-form-container">
                  <form>
                    <div>
                      <input
                        type="tel"
                        name="number"
                        placeholder="Card number"
                        onKeyUp={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                      <div>E.g.: 49..., 51..., 36..., 37...</div>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onKeyUp={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="expiry"
                        placeholder="Valid through"
                        onKeyUp={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                      <input
                        type="tel"
                        name="cvc"
                        placeholder="CVC"
                        onKeyUp={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                  </form>
                </div>

                <div className="col-md-6">
                  <Cards
                    number={this.state.number}
                    name={this.state.name}
                    expiry={this.state.expiry}
                    cvc={this.state.cvc}
                    focused={this.state.focused}
                    callback={this.handleCallback}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success" onClick={this.handleSubmit}>Save</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect()(PaymentModal);
