import React from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import EmptyContainer from '../../../../EmptyContainer';
import Valuations from '../../../../../api/valuations/valuations';
import StationProfiles from '../../../../../api/stationProfiles/stationProfiles';
import Cars from '../../../../../api/cars/cars';
import Orders from '../../../../../api/orders/orders';

class Evaluations extends React.Component {
  state = {
    selectedCar: '',
    selectedOrder: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = (phone) => {
    Push.create('Station phone', {
      body: phone,
      icon: '/img/success.png',
      timeout: 6000,
    });
  };

  render() {
    const valuations = Valuations.find({ orderId: this.state.selectedOrder });

    return (
      <EmptyContainer>
        <div id="evaulations" className="anchor" />
        <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title">Evaluations</h3>
          </div>

          <div className="box-body">
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label>Car:</label>
                  <select
                    name="selectedCar"
                    className="form-control"
                    value={this.state.selectedCar}
                    onChange={this.handleChange}
                  >
                    <option disabled value="">Choose car</option>
                    {this.props.userCars.map(car => (
                      <option key={car._id} value={car._id}>
                        {car.company} / {car.model} / {car.year}
                      </option>
                  ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Order:</label>
                  <select
                    name="selectedOrder"
                    className="form-control"
                    value={this.state.selectedOrder}
                    onChange={this.handleChange}
                  >
                    <option disabled value="">Choose order</option>
                    {Orders.find({ carId: this.state.selectedCar }).fetch().map(order => (
                      <option key={order._id} value={order._id}>
                        {order.parts} | {moment(order.creationDate).format('D MMMM YYYY')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <ul className="nav nav-tabs">
              <li className="active"><a className="pointer" data-toggle="tab" aria-expanded="true">Best price</a></li>
              <li className=""><a className="pointer" data-toggle="tab" aria-expanded="false">Best terms</a></li>
              <li className=""><a className="pointer" data-toggle="tab" aria-expanded="false">Closest</a></li>
              <li className=""><a className="pointer" data-toggle="tab" aria-expanded="false">Biggerst rating</a></li>
            </ul>

            <ul className="timeline">
              {valuations.map((valuation) => {
                const stationProfile = StationProfiles.findOne({ stationId: valuation.userId });
                return (
                  <li key={valuation._id}>
                    <div className="timeline-item">
                      <span className="time">
                        <h5 className="modal-title" id="myModalLabel">
                          <i className="fa fa-map-o" /> {stationProfile.address}
                        </h5>
                      </span>
                      <h3 className="timeline-header">
                        <a href="#">{stationProfile.name}</a>
                      </h3>

                      <div className="timeline-body clearfix">
                        <div className="row">
                          <div className="col-md-3">
                            <p>
                              <label>Station rating:</label>
                              <span> {stationProfile.score}</span>
                            </p>
                            {!stationProfile.isVerified && <span className="label bg-red moderation-label">Not verified</span>}
                            {stationProfile.isVerified && <span className="label bg-green moderation-label">Verified</span>}
                          </div>
                          <div className="col-md-3">
                            {valuation.evaluatedParts.map(part => (
                              <div key={part.name}>
                                <p>
                                  <label>Part name:</label>
                                  <span> {part.name}</span>
                                </p>

                                <p>
                                  <label>Repair cost:</label>
                                  <span> {part.price}</span>
                                </p>

                                <p>
                                  <label>Term (days):</label>
                                  <span> {part.term}</span>
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="col-md-3">
                            <p>
                              <label>Total cost:</label>
                              <span> {valuation.totalPrice}</span>
                            </p>

                            <p>
                              <label>Total term (days):</label>
                              <span> {valuation.totalTermDays}</span>
                            </p>
                          </div>
                          <div className="col-md-3">
                            <button onClick={() => { this.handleClick(stationProfile.stationPhone); }} className="btn">Show phone</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </EmptyContainer>
    );
  }
}


const trackedComponent = withTracker(() => {
  Meteor.subscribe('getAllValuations');
  Meteor.subscribe('getAllStationProfiles');
  Meteor.subscribe('getCarsForCurrentUser');
  Meteor.subscribe('getOrdersForCurrentUser');

  return {
    userCars: Cars.find().fetch() || [],
  };
})(Evaluations);

export default connect()(trackedComponent);
