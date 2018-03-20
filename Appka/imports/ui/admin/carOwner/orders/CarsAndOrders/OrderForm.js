import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import Select from 'react-select';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import moment from 'moment';
import InputMoment from 'input-moment';
import { Collapse } from 'react-collapse';

import 'react-select/dist/react-select.css';
import 'input-moment/dist/input-moment.css';

import FileUpload from '../FileUpload/FileUpload';
import Orders from '../../../../../api/orders/orders';
import EmptyContainer from './../../../../EmptyContainer';
import { addOrderForCurrentUser, updateOrderForCurrentUser } from './../../../../../actions/meteorSpecific';

class OrderForm extends Component {
  state = {
    parts: this.props.order ? this.props.order.parts : '',
    partsOptions: [
      { label: 'Задний бампер', value: 'Задний бампер' },
      { label: 'Заднее крыло', value: 'Заднее крыло' },
      { label: 'Боковая дверь', value: 'Боковая дверь' },
      { label: 'Весь кузов', value: 'Весь кузов' },
    ],
    location: this.props.order ? this.props.order.location : '',
    maxDistance: this.props.order ? this.props.order.maxDistance : 30,
    deadline: this.props.order ? moment(this.props.order.deadline) : moment(),
    desiredFix: this.props.order ? this.props.order.desiredFix : '',
    comment: this.props.order ? this.props.order.comment : '',
    deadlineCollapseOpened: false,
    additionalInfoCollapseOpened: false,
  }

  handlePartsSelectChange = (value) => {
    this.setState({ parts: value });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSlideChange = (e) => {
    this.setState({
      maxDistance: e.target.value,
    });
  };

  handleDateChange = (m) => {
    this.setState({ deadline: m });
  };

  handleDateSave = () => { this.handleDeadlineCollapse(); };

  handleDeadlineCollapse = () => {
    this.setState({
      deadlineCollapseOpened: !this.state.deadlineCollapseOpened,
    });
  };

  handleAdditionalInfoCollapse = () => {
    this.setState({
      additionalInfoCollapseOpened: !this.state.additionalInfoCollapseOpened,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setSavingStatus(true);

    const {
      parts, location, maxDistance, deadline, desiredFix, comment,
    } = this.state;

    const order = {
      carId: this.props.carId,
      parts,
      location,
      maxDistance,
      deadline: deadline.toDate(),
      desiredFix,
      comment,
    };

    const cb = (err) => {
      if (err) {
        alert(err);
      }
    };
    if (this.props.orderId === Meteor.userId()) {
      this.props.dispatch(addOrderForCurrentUser(order, cb));
    } else {
      this.props.dispatch(updateOrderForCurrentUser(this.props.orderId, order, cb));
    }
  };

  render() {
    return (
      <EmptyContainer>
        <div className="modal-body">
          <form noValidate>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Select the body part (s) with defects</label>
                  <Select
                    multi
                    onChange={this.handlePartsSelectChange}
                    options={this.state.partsOptions}
                    placeholder="Enter body part"
                    removeSelected
                    simpleValue
                    value={this.state.parts}
                  />
                </div>

                <div className="form-group">
                  <label>
                  Enter your location, from where you would be convenient to get to Tech station
                  </label>
                  <input
                    name="location"
                    className="form-control"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Receive proposals from station in a radius of {this.state.maxDistance} km</label>
                  <div>
                    <ReactBootstrapSlider
                      name="allowedDistance"
                      value={this.state.maxDistance}
                      slideStop={this.handleSlideChange}
                      step={1}
                      max={300}
                      min={5}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Make repairs until:</label>
                  <div>
                    <div className="vertical-align flex-between">
                      <p>{this.state.deadline.format('D MMMM YYYY, hh:mm')}</p>
                      <p>({this.state.deadline.endOf('day').fromNow()})</p>

                      <a className="btn btn-app" tabIndex={0} role="button" onClick={this.handleDeadlineCollapse}>
                        <i className="fa fa-edit" /> Change
                      </a>
                    </div>
                    <Collapse isOpened={this.state.deadlineCollapseOpened}>
                      <div className="presto-align-items-center">
                        <InputMoment
                          moment={this.state.deadline}
                          onChange={this.handleDateChange}
                          onSave={this.handleDateSave}
                        />
                      </div>
                    </Collapse>
                  </div>
                </div>

              </div>
              <div className="col-md-6">
                <FileUpload orderId={this.props.orderId} />
              </div>
            </div>

            <button type="button" className="btn bg-navy margin-bottom" onClick={this.handleAdditionalInfoCollapse}>
            Specify additional information
            </button>
            <Collapse isOpened={this.state.additionalInfoCollapseOpened}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>What do you want to do with defects</label>
                    <input
                      name="desiredFix"
                      type="text"
                      className="form-control"
                      value={this.state.desiredFix}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Comment</label>
                    <textarea
                      name="comment"
                      className="form-control"
                      rows="3"
                      value={this.state.comment}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </Collapse>
          </form>
        </div>


        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-success" onClick={this.handleSubmit} data-dismiss="modal">Save</button>
        </div>
      </EmptyContainer>
    );
  }
}

const trackedOrderForm = withTracker(({ orderId }) => ({
  order: Orders.find({ _id: orderId }).fetch()[0],
}))(OrderForm);

export default connect()(trackedOrderForm);
