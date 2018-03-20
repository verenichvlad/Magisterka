import React from 'react';
import { jQuery } from 'meteor/jquery';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import { setNewOrderPopup, setEditOrderPopup } from './../../../../../actions/ui';
import OrderForm from './OrderForm';
import Cars from '../../../../../api/cars/cars';


class OrderModal extends React.Component {
  state = {
    isSaving: false,
  };

  componentDidMount() {
    jQuery('#orderModal').modal('toggle');
    jQuery('#orderModal').on('hidden.bs.modal', this.handleClose);
  }

  setSavingStatus = (isSaving) => {
    this.setState({ isSaving });
  };

  handleClose = () => {
    setTimeout(() => {
      this.props.dispatch(setNewOrderPopup(false, null));
      this.props.dispatch(setEditOrderPopup(false, null, null));
    }, 200);
  };

  render() {
    const { company, model, year } = this.props.car;
    const orderId = this.props.orderId || Meteor.userId();

    return (
      <div className="modal fade" id="orderModal">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                <i className="fa fa-car" /> {company} / {model} / {year} - New Order
              </h4>
            </div>

            <OrderForm
              setSavingStatus={this.setSavingStatus}
              orderId={orderId}
              carId={this.props.carId}
            />
          </div>
        </div>
      </div>
    );
  }
}

const trackedOrderModal = withTracker(({ carId }) => ({
  car: Cars.find({ _id: carId }).fetch()[0],
}))(OrderModal);

export default connect()(trackedOrderModal);
