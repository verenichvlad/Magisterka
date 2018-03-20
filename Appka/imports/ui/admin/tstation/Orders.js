import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

import DbOrders from '../../../api/orders/orders';
import Valuations from '../../../api/valuations/valuations';
import Cars from '../../../api/cars/cars';
import UserFiles from '../../../api/userFiles/userFiles';
import EmptyContainer from '../../EmptyContainer';
import EvaluationPopup from './orders/EvaluationPopup';
import { setEvaluationPopup } from '../../../actions/ui';
import { changePage } from '../../../actions/stoOrders';
import Filters from './orders/Filters';

class Orders extends Component {
  handlePageClick = data => this.props.dispatch(changePage(data.selected));

  render() {
    return (
      <EmptyContainer>
        <div id="orders" className="anchor" />
        <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title">Orders for evaluation</h3>
          </div>

          <div className="box-body">

            <Filters ordersCount={this.props.ordersCount} />

            <ul className="nav nav-tabs">
              <li className="active"><a className="pointer" data-toggle="tab" aria-expanded="true">Orders</a></li>
              <li className=""><a className="pointer" data-toggle="tab" aria-expanded="false">Filtr</a></li>
            </ul>


            <ul className="timeline">
              {this.props.orders.map((order) => {
              const car = Cars.findOne({ _id: order.carId });
              const userFile = UserFiles.findOne({ 'meta.orderId': order._id });
              const thumbnail = userFile ? userFile.link() : null;
              return (
                <li key={order._id}>
                  <div className="timeline-item">
                    <span className="time">
                      <h5 className="modal-title" id="myModalLabel">
                        <i className="fa fa-car" /> {car.company} / {car.model} / {car.year}
                      </h5>
                    </span>
                    <h3 className="timeline-header">
                      <a href="#">{order.parts}</a>
                    </h3>

                    <div className="timeline-body clearfix">
                      <div className="row">
                        <div className="col-md-3 margin-bottom">
                          {thumbnail && <img src={thumbnail} alt="" className="seized img-thumbnail" />}
                          {!thumbnail && <img src="/img/placeholder.png" alt="" className="seized img-thumbnail" />}
                        </div>
                        <div className="col-md-4">
                          <p>
                            <label>Desired dates:</label>
                            <span> {moment(order.deadline).format('D MMMM YYYY, hh:mm')}</span>
                          </p>
                          <p>
                            <label>Car color:</label>
                            <span> {car.color}</span>
                          </p>
                          <p>
                            <label>The application was received:</label>
                            <span> {moment(order.creationDate).fromNow()}</span>
                          </p>
                          <p>
                            <label>Priority:</label>
                            <span> TODO</span>
                          </p>
                          <hr />
                          <p>
                            <label><i className="fa fa-paper-plane" />&nbsp;
                              <span>
                                Valuations: {Valuations.find({ orderId: order._id }).count()}
                              </span>
                            </label>&nbsp;&nbsp;
                            {!order.moderationPassed && <span className="label bg-red moderation-label">Not verified</span>}
                            {order.moderationPassed && <span className="label bg-green moderation-label">Verified</span>}
                          </p>
                        </div>
                        <div className="col-md-5">
                          <div className="form-group">
                            <label>Comment for the application</label>
                            <p>
                              {order.comment}
                            </p>
                          </div>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              this.props.dispatch(setEvaluationPopup(true, car, order));
                              }}
                          >
                            Look and evaluate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>);
            })}
            </ul>


            {this.props.ordersCount > 0 &&
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel={<a>...</a>}
              pageCount={this.props.ordersCount / 5}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              activeClassName="active"
            />}
          </div>


          {this.props.evaluationPopup.active &&
            <EvaluationPopup
              car={this.props.evaluationPopup.car}
              order={this.props.evaluationPopup.order}
            /> }
        </div>
      </EmptyContainer>
    );
  }
}

const trackedComponent = withTracker(({ stoOrders }) => {
  Meteor.subscribe('getAllCars');
  Meteor.subscribe('getAllOrders');
  Meteor.subscribe('getAllImages');
  Meteor.subscribe('getAllValuations');

  return {
    orders: DbOrders.find({}, { limit: 5, skip: stoOrders.pagesToSkip }).fetch() || [],
    ordersCount: DbOrders.find().count(),
  };
})(Orders);

function mapStateToProps(state) {
  return {
    evaluationPopup: state.ui.evaluationPopup,
    stoOrders: state.stoOrders,
  };
}

export default connect(mapStateToProps)(trackedComponent);
